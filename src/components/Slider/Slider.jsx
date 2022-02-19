import { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "react-bootstrap/Card";
import "./Slider.css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // get 6 news posts from Hacker news
    try {
      fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
        .then((res) => res.json())
        .then((responseArticles) => {
          const slicedArticle = responseArticles.slice(0, 6);

          // loop through single article ID's and get details
          slicedArticle.map((singleArticle, inc) => {
            // only get 6 items
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${singleArticle}.json`
            )
              .then((res) => res.json())
              .then((abc) => {
                this.setState({ items: [...this.state.items, abc] });
              });
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log("items", this.state.items);
    const { items } = this.state;

    return (
      <div class="main-slider">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1.5}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          {items.map((article, index) => {
            return (
              <SwiperSlide key={index}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={`https://picsum.photos/id/${index}/180/100`}
                  />
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>

                    <a
                      className="btn btn-primary"
                      target="_blank"
                      href={article.url}
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
}

export default Slider;
