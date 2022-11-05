import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import MyLoader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import imageAPI from '../services/api';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    image: null,
    error: null,
    status: 'idle',
    page: 1,
    totalPages: 0,
    showModal: false,
    largeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const { page } = this.state;

    if (prevName !== nextName) {
      this.setState({ page: 1, status: 'pending' });

      const response = await imageAPI
        .fetchImages(nextName, page)
        .catch(error => this.setState({ error }));

      if (response.data.totalHits === 0) {
        toast('🦄 Enter correct request!');
        this.setState({ status: 'pending' });
        return;
      }
      return this.setState({
        image: response.data.hits,
        totalPages: Math.ceil(response.data.totalHits / 12),
        status: 'resolved',
      });
    }

    if (prevState.page !== page) {
      const response = await imageAPI
        .fetchImages(nextName, page)
        .catch(error => this.setState({ error }));
      return this.setState(prevState => ({
        image: [...prevState.image, ...response.data.hits],
        status: 'resolved',
      }));
    }
  }

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClick = photo => {
    const largeImage = photo;
    this.setState({
      largeImage,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { image, error, status, showModal, largeImage, totalPages, page } =
      this.state;
    if (status === 'pending') {
      return <MyLoader />;
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <ul className={css.ImageGallery}>
            {image.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImg={largeImageURL}
                tags={tags}
                onClick={this.onClick}
              ></ImageGalleryItem>
            ))}
          </ul>
          {showModal && (
            <Modal src={largeImage} onClose={this.toggleModal}></Modal>
          )}

          {totalPages > page && <Button onLoadMore={this.LoadMore} />}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
