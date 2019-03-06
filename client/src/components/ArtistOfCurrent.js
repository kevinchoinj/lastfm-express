import React from 'react';
import {connect} from 'react-redux';

import {
  selectCurrentArtistName,
  selectCurrentArtistBioContent,
  selectCurrentArtistImageQuality,
  selectCurrentArtistSimilarArtists,
  selectCurrentArtistTagsText,
} from 'reducers';

class ArtistOfCurrent extends React.Component{

  createMarkup = (text) => {
    return {__html: text};
  }

  render(){

    const {
      name,
      bio,
      image,
      similar,
      tags,
    } = this.props;

    return(
      <div className="artist_container">
        <div className="artist_left">
          <img src={image} className="artist_image" alt={name} />
          <div className="artist_name">
            <strong>
              {name}
            </strong>
          </div>
          <div className="artist_left__block">
            <strong>Similar Artists</strong>
            {similar && similar.length && similar.map((value, key) =>
              <div key={key}>
                {value.name}
              </div>
            )}
          </div>
          <div className="artist_left__block">
            <strong>Tags</strong>
            {tags && tags.length && tags.map((value, key) =>
              <div key={key}>
                {value.name}
              </div>
            )}
          </div>
        </div>
        <div className="artist_right">
          <div>
            <div dangerouslySetInnerHTML={this.createMarkup(bio)} />
          </div>

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    name: selectCurrentArtistName(state),
    bio: selectCurrentArtistBioContent(state),
    image: selectCurrentArtistImageQuality(state),
    similar: selectCurrentArtistSimilarArtists(state),
    tags: selectCurrentArtistTagsText(state),
  }),
)(ArtistOfCurrent);
