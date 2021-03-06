import { userActionForPost } from "./UserAction"

export async function getTitles(page: number, term?: string) {
  const query = term 
  ? `
  query {
    Page(page: ${page}, perPage: 18) {
      media(search: "${term}") {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
      }
    }
  }
  `
  : `
  query {
    Page(page: ${page}, perPage: 18) {
      media {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
      }
    }
  }
  `
  const response = await userActionForPost({ query }) 
  return response.data.Page.media
}

export async function getTitleDetails(titleId: number) {
  const query = `
  query {
      Media(id: ${titleId}) {
        id
        description
        seasonYear
        chapters
        genres
        startDate {
          year
          month
          day
        }
        characters {
          edges {
            id
          }
        }
        title {
          romaji
          native
        }
        coverImage {
          extraLarge
        }
      }
  }
  `

  const response = await userActionForPost({ query }) 
  return response.data.Media
}
