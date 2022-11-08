import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import imageAPI from '../components/services/api';
import { toast } from 'react-toastify';
import Modal from 'components/Modal/Modal';
import MyLoader from './Loader/Loader';
import Button from 'components/Button/Button';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    error: null,
    page: 1,
    totalPages: 0,
    showModal: false,
    largeImage: '',
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const { page } = this.state;

    if (prevName !== nextName || prevState.page !== page) {
      this.setState({ isLoading: true });

      const response = await imageAPI
        .fetchImages(nextName, page)
        .catch(error => this.setState({ error }));

      if (response.data.totalHits === 0) {
        toast('🦄 Enter correct request!');
        this.setState({ images: [] });
        return;
      }

      response.data.hits.forEach(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return this.setState(({ images }) => ({
            images: [...images, { id, webformatURL, largeImageURL, tags }],
            totalPages: Math.ceil(response.data.totalHits / 12),
            isLoading: false,
          }));
        }
      );

      // return this.setState(({ images }) => ({
      //   images: [...images, ...response.data.hits],
      //   totalPages: Math.ceil(response.data.totalHits / 12),
      //   isLoading: false,
      // }));
    }
  }

  onClick = photo => {
    const largeImage = photo;
    this.setState({
      largeImage,
      showModal: true,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  render() {
    const { images, totalPages, page, isLoading, largeImage, showModal } =
      this.state;
    return (
      <div className="container">
        {<Searchbar onSubmit={this.handleFormSubmit} />}

        {images.length > 0 && (
          <ImageGallery
            images={images}
            onClick={this.onClick}
            totalPages={totalPages}
            page={page}
            onLoadMore={this.onLoadMore}
            isLoading={isLoading}
          />
        )}

        {isLoading && <MyLoader />}
        {images.length >= 12 && totalPages > page && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && <Modal src={largeImage} onClose={this.toggleModal} />}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
