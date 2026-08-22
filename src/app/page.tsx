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
import SectionDeck, { type Tab } from "@/components/SectionDeck";
import {
  MailIcon,
  GithubIcon,
  ScholarIcon,
  FileIcon,
  LinkedinIcon,
} from "@/components/Icons";

function Hero() {
  return (
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
  );
}

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

function EntryList({ items }: { items: typeof experience }) {
  return (
    <div className="entries">
      {items.map((e) => (
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
  );
}

const anyEqual = publications.some((p) => p.equalContribution?.length);

const tabs: Tab[] = [
  {
    id: "about",
    label: "About",
    content: (
      <section className="section">
        <Hero />
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
    ),
  },
  {
    id: "news",
    label: "News",
    content: (
      <section className="section">
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
    ),
  },
  {
    id: "publications",
    label: "Publications",
    content: (
      <section className="section">
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
    ),
  },
  {
    id: "experience",
    label: "Experience",
    content: (
      <section className="section">
        <h2 className="section-title">Research Experience</h2>
        <EntryList items={experience} />
      </section>
    ),
  },
  {
    id: "education",
    label: "Education",
    content: (
      <section className="section">
        <h2 className="section-title">Education</h2>
        <EntryList items={education} />
      </section>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Interactions />

      <SectionDeck
        brand={profile.name}
        toolbar={<ThemeToggle />}
        tabs={tabs}
      />

      <footer className="footer">
        <span>
          © {profile.name} · {profile.location}
        </span>
        <span>Built with Next.js · Hosted on GitHub Pages</span>
      </footer>
    </>
  );
}
