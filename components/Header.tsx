export default function Header() {
  return (
    <>
      <div className="flex justify-end">
        <ul>
          <li>
            View on{" "}
            <span>
              {" "}
              <a
                className="text-teal-500 hover:text-teal-600"
                href="https://github.com/jakeevans00/url-shortener"
              >
                Github
              </a>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
