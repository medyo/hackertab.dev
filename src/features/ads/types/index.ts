type AdProvider = {
  name: string,
  title: string,
  link?: string,
}

export type Ad = {
  title?: string,
  description: string,
  imageUrl: string,
  viewUrl?: string,
  link: string,
  backgroundColor?: string,
  provider: AdProvider,
}