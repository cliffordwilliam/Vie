import React from "react";
export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {date} Vie. All rights reserved. Made with ❤️ by William.</p>
    </footer>
  );
}
