import React from 'react'

const Review = (props) => (
  <div className="row mbl">
    <div className="small-1 columns"><strong>Name</strong></div>
    <div className="small-11 columns">{props.data.name}</div>

    <div className="small-1 columns"><strong>Score</strong></div>
    <div className="small-11 columns">{props.data.rating / 100 * 5} stars</div>

    <div className="small-1 columns"><strong>Review</strong></div>
    <div className="small-11 columns">{props.data.content}</div>
  </div>
)

const Reviews = (props) => {
  let reviews

  if (props.data && props.data.length > 0) {
    reviews = props.data.map((review, i) => {
      return <Review key={`review-${i}`} data={review} />
    })
  } else {
    reviews = `No reviews yet!`
  }

  return <div>{reviews}</div>
}

export default Reviews
