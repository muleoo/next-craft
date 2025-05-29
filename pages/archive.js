import Container from '@/components/Container'
import NotePost from '@/components/NotePost'
import { getBlocksMaps } from '@/lib/getBlocksMaps'

// export async function getStaticProps() {
//   const { pagesJson, siteConfigObj } = await getBlocksMaps()

//   let blocksJson = pagesJson
//   // Hide table header and home page on Archive page.
//   // for (let i = 0; i < blocksJson.length; i++) {
//   //   const deleteTitleBlock = blocksJson[i].title === 'Title' ? blocksJson.splice(i, i + 1) : blocksJson
//   //   const deleteIndexBlock = blocksJson[i].slug === 'index' ? blocksJson.splice(i, i + 1) : blocksJson
//   //   console.log('[INFO] Deleted length: ', deleteTitleBlock.length, deleteIndexBlock.length)
//   // }
//   blocksJson = blocksJson.filter(block =>
//     block.title !== 'Title' && block.slug !== 'index'
//   )

//   return {
//     props: {
//       blocksJson,
//       siteConfigObj
//     },
//     revalidate: 1
//   }
// }

export async function getStaticProps({ locale }) {
  try {
    const { pagesJson, siteConfigObj } = await getBlocksMaps()

    let blocksJson = pagesJson.filter(block =>
      block.title !== 'Title' && block.slug !== 'index'
    )

    return {
      props: {
        blocksJson,
        siteConfigObj
      },
      revalidate: 1
    };
  } catch (error) {
    console.error('Failed to fetch archive data:', error)
    return {
      props: {
        blocksJson: [],
        siteConfigObj: {}
      },
      revalidate: 1
    }
  }
}

const Notes = ({ blocksJson, siteConfigObj }) => {
  return (
    <Container
      title={siteConfigObj['Site Name']}
      description={siteConfigObj['Site Description']}
      siteConfigObj={siteConfigObj}
    >
      {blocksJson.map((block) => (
        <NotePost key={block.slug} note={block} />
      ))}
    </Container>
  )
}

export default Notes
