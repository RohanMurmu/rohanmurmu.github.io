import {
  profile,
  news,
  publications,
  projects,
  education,
  experience,
  awards,
  skills,
  ME,
  type Publication,
} from "@/data/profile";
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
  ["Publications", "#publications"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Awards", "#awards"],
];

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

export default function Home() {
  const anyEqual = publications.some((p) => p.equalContribution?.length);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-name" href="#top">
            {profile.name}
          </a>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="wrap" id="top">
        {/* ---------- hero ---------- */}
        <header className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-photo"
            src={profile.photo}
            alt={profile.name}
            width={148}
            height={148}
          />
          <div className="hero-body">
            <h1>
              {profile.name}
              <span className="hero-name-ko">{profile.nameKo}</span>
            </h1>
            <p className="hero-role">
              {profile.role}
              <br />
              <strong>{profile.affiliation}</strong>
              <br />
              {profile.lab}
              <br />
              Advised by{" "}
              <strong>Prof. {profile.advisor}</strong>
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
                  Google Scholar
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
        </header>

        {/* ---------- about ---------- */}
        <section className="section" id="about">
          <h2 className="section-title">About</h2>
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
          <h2 className="section-title">News</h2>
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
          <h2 className="section-title">Publications</h2>
          <ol className="pubs">
            {publications.map((p) => (
              <li className="pub" key={p.title}>
                <div>
                  <div className="pub-title">{p.title}</div>
                  <Authors pub={p} />
                  <div className="pub-venue">
                    <em>{p.venue}</em>, {p.year}
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

        {/* ---------- projects ---------- */}
        <section className="section" id="projects">
          <h2 className="section-title">Projects</h2>
          <div className="entries">
            {projects.map((p) => (
              <div className="entry" key={p.name}>
                <div className="entry-period">{p.period}</div>
                <div>
                  <div className="entry-title">{p.name}</div>
                  <div className="entry-sub">{p.org}</div>
                  {p.note && <div className="entry-note">{p.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- experience + education ---------- */}
        <section className="section" id="experience">
          <h2 className="section-title">Research Experience</h2>
          <div className="entries">
            {experience.map((e) => (
              <div className="entry" key={e.period + e.org}>
                <div className="entry-period">{e.period}</div>
                <div>
                  <div className="entry-title">{e.title}</div>
                  <div className="entry-sub">
                    {e.org} · {e.location}
                  </div>
                  {e.note && <div className="entry-note">{e.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="education">
          <h2 className="section-title">Education</h2>
          <div className="entries">
            {education.map((e) => (
              <div className="entry" key={e.period}>
                <div className="entry-period">{e.period}</div>
                <div>
                  <div className="entry-title">{e.title}</div>
                  <div className="entry-sub">
                    {e.org} · {e.location}
                  </div>
                  {e.note && <div className="entry-note">{e.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- awards ---------- */}
        <section className="section" id="awards">
          <h2 className="section-title">Awards &amp; Honors</h2>
          <div className="entries">
            {awards.map((a) => (
              <div className="entry" key={a.title}>
                <div className="entry-period">{a.date}</div>
                <div>
                  <div className="entry-title">{a.title}</div>
                  <div className="entry-sub">{a.org}</div>
                  {a.note && <div className="entry-note">{a.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- skills ---------- */}
        <section className="section" id="skills">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills">
            {skills.map((s) => (
              <div className="skill-row" key={s.label}>
                <div className="skill-label">{s.label}</div>
                <div>{s.items}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>
            © {profile.name} · {profile.location}
          </span>
          <span>Built with Next.js · Hosted on GitHub Pages</span>
        </footer>
      </main>
    </>
  );
}
