import Link from './Link'
import Paragraph from './Paragraph'
import Title from './Title'

type TypographyProps = {
  Link: typeof Link
  Paragraph: typeof Paragraph
  Title: typeof Title
}

const Typography: TypographyProps = () => null
Typography.Link = Link
Typography.Paragraph = Paragraph
Typography.Title = Title

export default Typography
