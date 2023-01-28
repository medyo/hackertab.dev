import { createElement, useState } from 'react'
import './steps.css'

type StepStatus = {
  [stepIndex: number]: 'current' | 'completed' | undefined | null
}

export type Step<T> = {
  title: string
  status?: 'current' | 'completed' | undefined | null
  element: React.ComponentType<StepProps<T>>
}

export type StepProps<T> = {
  showBackButton?: boolean
  moveToNext?: () => void
  moveToPrevious?: () => void
  tabsData: T
  setTabsData: (data: T) => void
}

type StepsProps<T> = {
  steps: Array<Step<T>>
  skipSteps?: boolean
  onFinish: (tabsData: T | undefined) => void
  onSkip: () => void
}

export const Steps = <T extends any>({
  onFinish,
  onSkip,
  skipSteps = false,
  steps,
}: StepsProps<T>) => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [tabsData, setTabsData] = useState<T>()
  const [stepsStatuses, setStepsStatuses] = useState<StepStatus>(
    steps.reduce(
      (obj: StepStatus, step, index: number) => {
        if (step.status) {
          obj[index] = step.status
        }

        return obj
      },
      { 0: 'current' }
    )
  )

  const moveToNext = () => {
    if (currentStep < steps.length - 1) {
      setStepsStatuses((prev) => {
        prev[currentStep] = 'completed'
        prev[currentStep + 1] = 'current'
        return prev
      })
      setCurrentStep((prev) => prev + 1)
    } else {
      onFinish(tabsData)
    }
  }

  const moveToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    } else if (currentStep === 0) {
      onSkip()
    }
  }

  const onStepClicked = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setCurrentStep(index)
  }

  const renderStep = () => {
    const props = {
      moveToNext,
      moveToPrevious,
      tabsData,
      setTabsData,
    } as unknown as StepProps<T>

    const element = createElement(steps[currentStep].element, props)

    return element
  }
  return (
    <div>
      <nav className="my-8" aria-label="Progress">
        <ol role="presentation" className="steps">
          {steps.map((_, index) => {
            return (
              <li key={index} className="wrapper">
                {stepsStatuses[index] === 'completed' || stepsStatuses[index] === 'current' ? (
                  <button onClick={(e) => onStepClicked(e, index)} className="step active">
                    <span className="stepBadge">{index + 1}</span>

                    <div className="stepLine">
                      {index !== steps.length - 1 && <div className="progressLine" />}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      if (skipSteps) {
                        onStepClicked(e, index)
                      }
                    }}
                    className="step">
                    <span className="stepBadge">{index + 1}</span>
                    <div className="stepLine">
                      {index !== steps.length - 1 && <div className="progressLine" />}
                    </div>
                  </button>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg px-8 py-4">{renderStep()}</div>
    </div>
  )
}
