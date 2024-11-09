export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        paddingTop: "200px",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a
        href="https://dan10ish.github.io"
        style={{ color: "blue", fontSize: "15px", paddingTop: "30px" }}
      >
        Go back to homepage
      </a>
    </div>
  );
}
