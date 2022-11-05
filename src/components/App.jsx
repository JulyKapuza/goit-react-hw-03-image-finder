import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };
  render() {
    const { imageName } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={imageName} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
