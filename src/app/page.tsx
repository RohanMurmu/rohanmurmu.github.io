import {
  profile,
  news,
  publications,
  education,
  experience,
  ME,
  type Publication,
} from "@/data/profile";
import Interactions from "@/components/Interactions";
import ThemeToggle from "@/components/ThemeToggle";
import {
  MailIcon,
  GithubIcon,
  ScholarIcon,
  FileIcon,
  LinkedinIcon,
} from "@/components/Icons";

const NAV = [
  ["About", "#about"],
  ["News", "#news"],
  ["Papers", "#publications"],
  ["Experience", "#experience"],
  ["Education", "#education"],
];

/* The name renders sans-bold with the surname as a serif-italic gradient
   accent, so split on the last space. */
const nameParts = (() => {
  const i = profile.name.lastIndexOf(" ");
  return i === -1
    ? { first: profile.name, last: "" }
    : { first: profile.name.slice(0, i), last: profile.name.slice(i + 1) };
})();

function Authors({ pub }: { pub: Publication }) {
  const eq = pub.equalContribution ?? [];
  return (
    <div className="pub-authors">
      {pub.authors.map((a, i) => (
        <span key={a}>
          <span className={a === ME ? "me" : undefined}>{a}</span>
          {eq.includes(a) && <sup>*</sup>}
          {i < pub.authors.length - 1 && ", "}
        </span>
      ))}
    </div>
  );
}

function SectionTitle({ no, children }: { no: string; children: string }) {
  return (
    <h2 className="section-title">
      <span className="section-no">{no}</span>
      {children}
      <span className="section-rule" aria-hidden />
    </h2>
  );
}

function EntryList({ items }: { items: typeof experience }) {
  return (
    <div className="entries">
      {items.map((e) => (
        <div className="entry" key={e.period + e.org}>
          <div className="entry-period">{e.period}</div>
          <div className="entry-body">
            <div className="entry-title">{e.title}</div>
            <div className="entry-sub">
              {e.org} · {e.location}
            </div>
            {e.note && <div className="entry-note">{e.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const anyEqual = publications.some((p) => p.equalContribution?.length);

  return (
    <>
      <Interactions />

      {/* fixed background: aurora glow + dot grid + film grain */}
      <div className="atmosphere" aria-hidden>
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="grid-layer" />
        <div className="noise-layer" />
      </div>

      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-name" href="#top">
            {nameParts.last ? (
              <>
                {nameParts.first[0]}
                <em>{nameParts.last[0]}</em>
              </>
            ) : (
              profile.name
            )}
          </a>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <ThemeToggle />
        </div>
        <div className="nav-progress" aria-hidden />
      </nav>

      <main className="wrap" id="top">
        {/* ---------- hero ---------- */}
        <header className="hero">
          <div className="hero-body">
            <p className="hero-kicker">
              {profile.interests.slice(0, 3).join(" · ")}
            </p>
            <h1 className="hero-name">
              {nameParts.first} {nameParts.last && <em>{nameParts.last}</em>}
            </h1>
            <p className="hero-role">
              {profile.role}
              <br />
              <strong>{profile.affiliation}</strong>
              <br />
              <a
                className="lab-link"
                href={profile.labUrl}
                target="_blank"
                rel="noreferrer"
              >
                {profile.lab}
              </a>
              <br />
              Advised by <strong>Prof. {profile.advisor}</strong>
            </p>

            <div className="links">
              <a className="link-chip" href={"mailto:" + profile.email}>
                <MailIcon />
                {profile.email}
              </a>
              <a
                className="link-chip"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
                GitHub
              </a>
              {profile.scholar && (
                <a
                  className="link-chip"
                  href={profile.scholar}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ScholarIcon />
                  Scholar
                </a>
              )}
              {profile.linkedin && (
                <a
                  className="link-chip"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>
              )}
              <a className="link-chip" href={profile.cv}>
                <FileIcon />
                CV (PDF)
              </a>
            </div>
          </div>

          <figure className="hero-figure">
            <span className="hero-photo-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="hero-photo"
                src={profile.photo}
                alt={profile.name}
                width={168}
                height={168}
              />
            </span>
            <figcaption className="hero-caption">
              fig. 0 — {profile.location}
            </figcaption>
          </figure>
        </header>

        {/* ---------- about ---------- */}
        <section className="section" id="about">
          <SectionTitle no="01">About</SectionTitle>
          {profile.bio.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <div className="tags">
            {profile.interests.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- news ---------- */}
        <section className="section" id="news">
          <SectionTitle no="02">News</SectionTitle>
          <ul className="news">
            {news.map((n) => (
              <li key={n.date + n.body.slice(0, 16)}>
                <span className="news-date">{n.date}</span>
                <span>{n.body}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- publications ---------- */}
        <section className="section" id="publications">
          <SectionTitle no="03">Publications</SectionTitle>
          <ol className="pubs">
            {publications.map((p) => (
              <li className="pub" key={p.title}>
                <div className="pub-fig">
                  {p.figure &&
                    (p.links?.[0] ? (
                      // convenience click target only — the labelled arXiv chip
                      // below is the one keyboard and screen-reader users get,
                      // so this duplicate is kept out of the tab order
                      <a
                        href={p.links[0].href}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={-1}
                        aria-hidden
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.figure.src}
                          alt=""
                          width={p.figure.width}
                          height={p.figure.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.figure.src}
                        alt=""
                        width={p.figure.width}
                        height={p.figure.height}
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                </div>
                <div>
                  <div className="pub-title">{p.title}</div>
                  <Authors pub={p} />
                  <div className="pub-venue">
                    <em>{p.venue}</em>
                    <span className="pub-year">{p.year}</span>
                  </div>
                  {p.links && p.links.length > 0 && (
                    <div className="pub-links">
                      {p.links.map((l) => (
                        <a
                          className="pub-link"
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {anyEqual && (
            <p className="footnote">
              <sup>*</sup> These authors contributed equally.
            </p>
          )}
        </section>

        {/* ---------- experience ---------- */}
        <section className="section" id="experience">
          <SectionTitle no="04">Research Experience</SectionTitle>
          <EntryList items={experience} />
        </section>

        {/* ---------- education ---------- */}
        <section className="section" id="education">
          <SectionTitle no="05">Education</SectionTitle>
          <EntryList items={education} />
        </section>

        <footer className="footer">
          <div className="footer-mark" aria-hidden>
            {profile.name}
          </div>
          <div className="footer-row">
            <span>
              © {profile.name} · {profile.location}
            </span>
            <span>Built with Next.js · Hosted on GitHub Pages</span>
          </div>
        </footer>
      </main>
    </>
  );
}
