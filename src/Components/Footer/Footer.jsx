import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-[#d7367c] p-10 text-white">
        <aside>
          <div className="flex justify-center items-center gap-1">
            <span className="text-3xl font-bold">🍳Recipe</span>
            <span className="text-3xl font-bold text-blue-200">Book</span>
          </div>
          <p className="font-bold">
            Tahreem Industries Ltd.
            <br />
           <div>
             Email: <a href="mailto:tahreemhossain0@gmail.com" className="underline">tahreemhossain0@gmail.com</a><br />
            Phone: <a href="tel:+8801319550316" className="underline">+8801319550316</a>
           </div>
          </p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </aside>

        <nav>
          <div className="flex gap-6">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.487 3.45.028 5.804 0 12c.028 6.185.487 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.708.869 3.213 2.188 4.096a4.904 4.904 0 0 1-2.229-.616v.06c0 2.385 1.693 4.374 3.946 4.827a4.935 4.935 0 0 1-2.224.085 4.923 4.923 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.936 13.936 0 0 0 7.548 2.212c9.057 0 14.01-7.513 14.01-14.01 0-.213-.004-.426-.014-.637A10.025 10.025 0 0 0 24 4.557z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;

