import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from './Carousel'
import { img_300, unavailable } from '../Config/config'
/* const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  
}); */
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function ShowDetails() {
  const classes = useStyles();
  const s = useParams();
  const type = s.type;
  const id = s.id;

  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
    console.log(video)
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{display:'grid',placeContent:'center',paddingBottom:'1rem'}}>
        <Card className={classes.root} style={{maxWidth:'100%',paddingBottom:'1rem'}}>
            {
                content && (
                    <>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt= {content?.title || content?.name}
                        height="400"
                        image={content?.backdrop_path
                            ? `${img_300}/${content.backdrop_path}`
                            : unavailable
                        }
                        title={content?.title || content?.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {content?.title || content?.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {content?.overview}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <div>
                    <Carousel id={id} media_type={type} />
                  </div>
                    <CardActions>
                        <Button size="small" variant="contained"
                            startIcon={<YouTubeIcon />}
                            color="secondary"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}  fullWidth>
                            Watch the Trailer
                        </Button>
                       {/*  <Button size="small" color="primary">
                        Learn More
                        </Button> */}
                    </CardActions>
                    </>
                )
            }
        </Card>
    </Container>
  );
}
