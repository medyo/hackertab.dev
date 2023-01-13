export const AdPlaceholder = ({ className = '' }: { className?: string }) => {
  return (
    <div className={'cardPlaceholder adCardPlaceholder'}>
      <span className="image" />
      <div className="cardContent">
        <span className="line" />
        <span className="smallLine" />
        <span className="smallLine" />
        <span className="smallLine" />
      </div>
    </div>
  )
}
