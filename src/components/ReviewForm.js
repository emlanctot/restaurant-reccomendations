import React from 'react';
import TextField from './TextField';
import Select from './Select';

class ReviewForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error: {},
      name: "",
      rating: "",
      review: "",
      starOptions: [0, 1, 2, 3, 4, 5]
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.validateNameChange = this.validateNameChange.bind(this);
  }

  handleFormSubmit(event){
    event.preventDefault();
    if (
      this.validateNameChange(this.state.name)
    ){
      let formPayload = {
        name: this.state.name,
        rating: this.state.rating * 20,
        content: this.state.review,
        restaurant_id: this.props.selectedId
    };
    console.log(formPayload);
    this.props.addRestaurantReview(formPayload);
    this.handleClearForm(event);
  }
}

  handleClearForm(event){
    this.setState({
      error: {},
      name: '',
      rating: '',
      review: '',
    })
  }

  handleNameChange(event){
    this.validateNameChange(event.target.value)
    this.setState({ name: event.target.value })
  }

  handleRatingChange(event){
    this.setState({ rating: event.target.value })
  }

  handleReviewChange(event){
    this.setState({ review: event.target.value })
  }

  validateNameChange(reviewerName) {
    if (reviewerName === '' || reviewerName === ' ') {
      let newError = { name: "please add your name"}
      this.setState({ error: Object.assign(this.state.error, newError ) })
      return false
    } else {
      let errorState = this.state.error
      delete errorState.name
      this.setState({ error: errorState })
      return true
    }
  }

  render(){
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.error).length > 0) {
      errorItems = Object.values(this.state.error).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }
    return(
      <form className='form' onSubmit={this.handleFormSubmit}>
      {errorDiv}
      <TextField
        content={this.state.name}
        label="Name"
        name="name"
        handlerFunction={this.handleNameChange}
      />
      <Select
        selectedOption={this.state.rating}
        label="Rating"
        name="rating"
        options={this.state.starOptions}
        handlerFunction={this.handleRatingChange}
      />
      <TextField
        content={this.state.review}
        label="Review"
        name="review"
        handlerFunction={this.handleReviewChange}
      />
      <input type='submit' className='button' value='Submit' />
    </form>

    )
  }
}



export default ReviewForm
