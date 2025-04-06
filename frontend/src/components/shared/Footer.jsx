import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 mt-1">
              © 2025 Your Company. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              className="text-gray-600 hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              className="text-gray-600 hover:text-black transition"
              aria-label="X"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.412 0H1.588C.711 0 0 .694 0 1.55v20.9C0 23.305.711 24 1.588 24h20.823C23.289 24 24 23.305 24 22.45V1.55C24 .694 23.289 0 22.412 0zm-6.149 7.774l-3.388 3.957 3.856 5.598h-2.155l-2.968-4.367-3.397 4.367H6.364l3.593-4.62-3.73-5.935h2.176l2.82 4.42 3.233-4.42h2.807z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              className="text-gray-600 hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
