import { React, useState, useEffect } from 'react'

const Home = () => {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState(null)

  const fetchMembers = async () => {
    const res = await fetch('/api/members')
    const data = await res.json()
    setMembers(data)
  }

  useEffect(() => {
    fetchMembers()
  }, [members])

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !picture) {
      alert('please fill in the form first')
      return
    }

    fetch('/api/members', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ name, email, image: imgData }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const onChangePicture = (e) => {
    console.log(e.target.files[0])
  }

  return (
    <div>
      <h1 className="App my-4">Home Page</h1>
      {/* <div className="w-50">
        <img src={imgData} alt="myuploads" />
      </div> */}
      <div className="container">
        <div className="mx-auto my-2">
          <form
            method="post"
            action="/api/members"
            onSubmit={onFormSubmit}
            enctype="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                name="name"
                id="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                name="email"
                id="email"
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Choose your image
              </label>
              <input
                className="form-control"
                onChange={onChangePicture}
                accept="image/png, image/gif, image/jpeg"
                name="image"
                type="file"
                id="formFile"
              />
            </div> */}

            <form
              action="/imageupload"
              method="post"
              enctype="multipart/form-data"
            >
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Choose your image
                </label>
                <input
                  onChange={onChangePicture}
                  className="form-control"
                  name="myImage"
                  type="file"
                  id="file"
                />
              </div>
            </form>

            <button type="submit" className="btn btn-success">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {members.map((member) => {
            return (
              <div key={member._id} className="col-lg-3 g-2 col-md-4 col-12">
                <div className="card mt-2">
                  <div className="card-header">Name: {member.name}</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Id: {member._id}</li>
                    <li className="list-group-item">Email: {member.email}</li>
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
