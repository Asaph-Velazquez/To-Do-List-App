function Footer() {
  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start">
          <div className="container p-4 pb-0">
            <section>
              <div className="row">
                {/* Name and description */}
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">MyList</h6>
                  <p>
                    Organize your tasks in a simple and effective way. An intuitive app to manage your pending tasks.
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                {/* Features */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Features</h6>
                  <p><a>Task Management</a></p>
                  <p><a>User-friendly Interface</a></p>
                  <p><a>Reminders</a></p>
                  <p><a>Cloud Sync</a></p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                {/* Contact */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                  <p><i className="fas fa-envelope mr-3"></i> saulvelpa120@gmail.com</p>
                  <p><i className="fas fa-map-marker-alt mr-3"></i> Mexico City</p>
                </div>

                {/* Social media */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">Follow Me</h6>

                  <a className="btn btn-dark btn-floating m-1" href="https://github.com/Asaph-Velazquez" role="button" target="_blank">
                    <i className="fab fa-github"></i>
                  </a>

                  <a className="btn btn-primary btn-floating m-1" href="https://x.com/Zerox141" role="button" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>

                  {/* Add more social media if you decide to use them */}
                </div>
              </div>
            </section>
          </div>

          <div className="text-center p-3">
            © 2025 MyList by Asaph Velázquez
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
