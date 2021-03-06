import React from 'react';
import { Container, RowContainer } from './styles';
import SearchBar from '../../components/SearchBar';
import {
  makeStyles,
  Theme,
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  LinearProgress
} from '@material-ui/core';
import { getTitles } from '../../api/TitleResource';
import { InfoOutlined } from '@material-ui/icons';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    progressBar: {
      maxHeight: 0,
      minWidth: '99%'
      
    }

  }),
)

const Titles: React.FC = () => {

  const history = useHistory()
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [titles, setTitles] = React.useState<any>()

  const fetchTitles = React.useCallback(async (term?: string) => {
    const titles = await getTitles(page, term)
    setTitles(titles)
  }, [titles])

  const searchTitle = React.useCallback((term: string) => {
    fetchTitles(term)
  }, [titles])
  
  React.useEffect(() => {
    fetchTitles()
  }, [page])

  return (
    <Container>
      <RowContainer>
        <SearchBar onSearch={searchTitle} />
      </RowContainer>
      <RowContainer>
        <GridList cellHeight={180} className={classes.gridList} cols={3}>
          {titles ?
            titles.map((title: any, index: number) => (
              <GridListTile key={title.id}>
                <img src={title.bannerImage || title.coverImage.extraLarge}/>
                <GridListTileBar
                  title={title.title.romaji}
                  subtitle={title.title.native}
                  actionIcon={
                    <IconButton 
                    className={classes.icon}
                    onClick={() => history.push(`/title-details/${titles[index].id}`)}
                    >
                      <InfoOutlined />
                    </IconButton>
                  }
                />

              </GridListTile>
            ))
            : <LinearProgress className={classes.progressBar} />
          }
        </GridList>
      </RowContainer>
    </Container>
  )
}

export default Titles;