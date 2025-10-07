import React from 'react';

const Contact = () => {
  return (
    <section className="bg-light p-3 mt-2">
  <h3 className="text-center mb-3">Contact us</h3>

  <div className="row align-items-start">
    <div className="col-md-6 mb-3">
      <p>Contact us and we will get back to you within 24 hours.</p>
      <p><i className="fa fa-map-marker"></i> Company Name</p>
      <p><i className="fa fa-phone"></i> +256 778 800 900</p>
      <p><i className="fa fa-envelope"></i> company@gmail.com</p>
    </div>

    <div className="col-md-6">
      <form>
        <div className="mb-2">
          <label>Contact</label>
          <input type="email" className="form-control" placeholder="email address" />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="comment" rows="3"></textarea>
        </div>
        <button className="btn btn-danger w-100 mt-2">Send</button>
      </form>
    </div>
  </div>
</section>

  );
};

export default Contact;
