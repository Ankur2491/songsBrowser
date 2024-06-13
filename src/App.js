import { Col, Row } from 'react-bootstrap';
import './App.css'
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import allSongs from './data/updatedSongs.json'
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("select a category");
  const catMapping = { "movieTitle": "Movie Title", "songTitle": "Song Title", "singer": "Singer", "lyricist": "Lyricist", "musicDirector": "Music Director" }
  const [results, setResults] = useState([]);
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">Songs-Browser</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
      <br />
      <Container fluid>
        <Row>
          <Col md={3}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="search text here"
                aria-label="searchText" onChange={changeSearchText} value={searchText}
              />
            </InputGroup>
          </Col>
          <Col md={{ span: 2 }}>
            <DropdownButton id="dropdown-basic-button" title={selectedCategory} onSelect={changeCategory} size='sm'>
              <Dropdown.Item eventKey='movieTitle' key='movieTitle'>Movie Title</Dropdown.Item>
              <Dropdown.Item eventKey='songTitle' key='songTitle'>Song Title</Dropdown.Item>
              <Dropdown.Item eventKey='singer' key='singer'>Singer</Dropdown.Item>
              <Dropdown.Item eventKey='lyricist' key='lyricist'>Lyricist</Dropdown.Item>
              <Dropdown.Item eventKey='musicDirector' key='musicDirector'>Music Director</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={{ span: 2 }}>
            <Button variant="primary" size="sm" onClick={searchSongs}>Search</Button>
          </Col>
        </Row>
        <hr />
        {
          results.length > 0 &&
          <Row>

            {results.map(result =>
              <Col sm={6}> <Card style={{ backgroundColor: '#d4d4d4', width: '100%' }}>
                <Card.Img variant="bottom" style={{ objectFit: 'none' }} src={result.image} />
                <Card.Body>
                  <Card.Title>{result.movie}</Card.Title>
                  <Card.Text>
                    {result.release_date}
                  </Card.Text>
                </Card.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>View</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        {result.songs.map(songRecord =>
                          <Col xs={12}>
                            <p><b>Title:</b> {songRecord.song}</p>
                            <p><b>Singer:</b>{songRecord.singers}</p>
                            <p><b>Music:</b> {songRecord.music}</p>
                            <p><b>Lyrics:</b></p>
                            <ul>
                              {songRecord.lyrics.map(lyricsName => <li>{lyricsName}</li>)}
                            </ul>
                            <hr />
                          </Col>
                        )}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card>
              </Col>
            )}
          </Row>
        }
      </Container>
    </div>
  );
  function changeSearchText(evt) {
    setSearchText(evt.target.value);
  }
  function changeCategory(evt) {
    setSelectedCategory(catMapping[evt]);
  }
  function searchSongs() {
    if (selectedCategory === 'Movie Title') {
      searchByMovieTitle();
    }
    else if (selectedCategory === 'Song Title') {
      searchBySongTitle();
    }
    else if (selectedCategory === 'Lyricist') {
      searchByLyricist();
    }
    else if (selectedCategory === 'Music Director') {
      searchByMusic();
    }
    else if (selectedCategory === 'Singer') {
      searchBySinger();
    }
  }

  function searchBySongTitle() {
    let movies = [];
    for (let movieRecord of allSongs.movies) {
      for (let songRecord of movieRecord['songs']) {
        if (songRecord['song'].toLowerCase().includes(searchText.toLowerCase())) {
          movies.push(movieRecord);
          break;
        }
      }
    }
    console.log(movies);
    setResults([...movies]);
  }
  function searchByMovieTitle() {
    let movies = [];
    for (let movieRecord of allSongs.movies) {
      if (movieRecord['movie'].toLowerCase().includes(searchText.toLowerCase())) {
        movies.push(movieRecord);
      }
    }
    setResults([...movies]);
  }
  function searchByLyricist() {
    let movies = [];
    for (let movieRecord of allSongs.movies) {
      for (let songRecord of movieRecord['songs']) {
        let lyricsRecord = songRecord['lyrics'].map(lyricist => lyricist.toLowerCase());
        if (isLyricistPresent(lyricsRecord)) {
          movies.push(movieRecord);
          break;
        }
      }
    }
    setResults([...movies]);
  }

  function searchByMusic() {
    let movies = [];
    for (let movieRecord of allSongs.movies) {
      for (let songRecord of movieRecord['songs']) {
        if (songRecord['music'].toLowerCase().includes(searchText.toLowerCase())) {
          movies.push(movieRecord);
          break;
        }
      }
    }
    setResults([...movies]);
  }

  function searchBySinger() {
    let movies = [];
    for (let movieRecord of allSongs.movies) {
      for (let songRecord of movieRecord['songs']) {
        if (songRecord['singers'].toLowerCase().includes(searchText.toLowerCase())) {
          movies.push(movieRecord);
          break;
        }
      }
    }
    setResults([...movies]);
  }


  function isLyricistPresent(lyricsArr) {
    let isPresent = false;
    for (let lyricist of lyricsArr) {
      if (lyricist.includes(searchText.toLowerCase())) {
        isPresent = true;
        break;
      }
    }
    return isPresent;
  }
}

export default App;
