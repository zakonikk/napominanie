import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Gift,
  Heart,
  Mail,
  MapPin,
  Moon,
  Quote,
  Send,
  Sparkles,
  X,
} from "lucide-react";

const promises = [
  {
    number: "01",
    title: "Я на связи",
    text: "Даже если между нами часовые пояса и длинный день — ты никогда не далеко от моих мыслей.",
    icon: Send,
  },
  {
    number: "02",
    title: "Собираю нас",
    text: "Из голосовых, случайных фото, ночных разговоров и планов, которые обязательно станут реальностью.",
    icon: Gift,
  },
  {
    number: "03",
    title: "Жду встречу",
    text: "Расстояние — это не пауза в нашей истории. Это всего лишь страница между двумя объятиями.",
    icon: Sparkles,
  },
];

const comfortCards = [
  { label: "если тихо грустно", title: "Ты не одна", text: "Я рядом с тобой — даже если сейчас это можно почувствовать только через эти слова." },
  { label: "если день не задался", title: "Ты уже достаточно", text: "Тебе не нужно быть сильной каждую минуту. Можно просто выдохнуть. Я никуда не исчезаю." },
  { label: "если очень скучаешь", title: "Скучаю тоже", text: "Положи ладонь на сердце. Где-то в этом мире моё сердце отвечает тебе тем же ритмом." },
];

const memories = [
  { image: "/manus-storage/memory-cafe_1fba7cfa.jpg", number: "01", title: "Наше маленькое «рядом»", text: "Даже обычный вечер становится особенным, если в нём есть ты." },
  { image: "/manus-storage/memory-window_974f93a1.jpg", number: "02", title: "Голосовые в дороге", text: "Люблю находить тебя в наушниках, в сообщениях и между делом." },
  { image: "/manus-storage/memory-sunset_d0595ed2.jpg", number: "03", title: "До самого света", text: "Мы обязательно соберём ещё много таких моментов — уже рядом." },
];

export default function Home() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-shell">
      <header className={`site-nav ${hasScrolled ? "site-nav--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="В начало страницы">
          <span className="brand-mark"><Heart size={15} fill="currentColor" /></span>
          <span>между нами</span>
        </a>
        <nav className="desktop-nav" aria-label="Навигация по странице">
          <a href="#letter">Письмо</a>
          <a href="#promises">Обещания</a>
          <a href="#memories">Воспоминания</a>
        </nav>
        <a className="nav-cta" href="#letter">
          <span>для тебя</span>
          <ArrowUpRight size={16} />
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="hero-content page-wrap">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> открой, если сегодня немного грустно</p>
              <h1>
                Ты —<br />
                <em>моя</em> самая<br />
                любимая.
              </h1>
              <p className="hero-subtitle">Это маленькое место, где я всегда рядом.<br className="desktop-only" /> Здесь можно выдохнуть, улыбнуться и вспомнить нас.</p>
              <a href="#letter" className="primary-button">
                <span>Зайти ко мне</span>
                <ArrowDownRight size={18} />
              </a>
            </div>
            <div className="hero-note" aria-label="Небольшая заметка">
              <div className="hero-note__top"><Moon size={15} /><span>заметка · 23:47</span></div>
              <p>«Иногда скучать — это просто ещё один способ сказать: ты мне очень нужна».</p>
              <div className="hero-note__line"><span /> <span>люблю тебя</span></div>
            </div>
          </div>
          <div className="hero-scroll page-wrap" aria-hidden="true">
            <span>листай ниже</span><span className="scroll-line" />
          </div>
        </section>

        <section className="letter-section section-light" id="letter">
          <div className="page-wrap letter-layout">
            <div className="section-kicker">
              <span className="section-index">01</span>
              <span>письмо, которое можно перечитать</span>
            </div>
            <div className="letter-main">
              <p className="eyebrow">сейчас и всегда</p>
              <h2>Расстояние<br /><em>не умеет</em> быть сильнее нас.</h2>
              <div className="letter-body">
                <p>Я знаю, бывают дни, когда особенно хочется просто оказаться рядом. Без экрана между нами, без «спокойной ночи» в чате — просто рядом.</p>
                <p>Но пока мы ждём, я собрал здесь маленькое место, где можно почувствовать: ты любима. Очень. Тихо, громко, в каждом часовом поясе.</p>
              </div>
              <button className="text-button" onClick={() => setIsLetterOpen(true)}>
                <span>Прочитать всё письмо</span><ArrowUpRight size={17} />
              </button>
            </div>
            <div className="letter-side">
              <div className="letter-card">
                <div className="letter-card__stamp"><Heart size={20} fill="currentColor" /></div>
                <div className="letter-card__meta"><span>для: тебя</span><span>от: меня</span></div>
                <Quote size={30} className="quote-icon" />
                <p>Я бы выбрал тебя снова. В любом городе. В любое время. В любой версии этой жизни.</p>
                <div className="letter-card__signature">твой человек<span>.</span></div>
              </div>
              <div className="side-caption"><span className="side-caption__line" /> расстояние — это просто цифра</div>
            </div>
          </div>
        </section>

        <section className="memories-section section-light" id="memories">
          <div className="page-wrap">
            <div className="section-heading memories-heading">
              <div>
                <div className="section-kicker"><span className="section-index">02</span><span>маленькая выставка нас</span></div>
                <h2>Вспоминай<br /><em>нас.</em></h2>
              </div>
              <p>Здесь могут жить ваши фотографии, смешные скриншоты и моменты, которые хочется сохранить поближе.</p>
            </div>
            <div className="memories-grid">
              {memories.map((memory) => (
                <article className="memory-card" key={memory.number}>
                  <div className="memory-photo" style={{ backgroundImage: `url(${memory.image})` }}><span>{memory.number}</span></div>
                  <div className="memory-copy"><h3>{memory.title}</h3><p>{memory.text}</p></div>
                </article>
              ))}
            </div>
            <p className="memories-note"><Heart size={13} fill="currentColor" /> сюда можно добавить ваши настоящие фотографии — и сделать это место только вашим</p>
          </div>
        </section>

        <section className="comfort-section" id="comfort">
          <div className="page-wrap">
            <div className="comfort-intro">
              <p className="eyebrow eyebrow--light"><Clock3 size={14} /> выбери, что тебе сейчас нужно</p>
              <h2>Открой любое<br /><em>тёплое слово.</em></h2>
              <p>Не обязательно читать всё. Иногда достаточно одной фразы, чтобы стало немного легче.</p>
            </div>
            <div className="comfort-grid">
              {comfortCards.map((card) => (
                <article className="comfort-card" key={card.label}>
                  <span className="comfort-label">{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <Heart size={17} fill="currentColor" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="promises-section section-light" id="promises">
          <div className="page-wrap">
            <div className="section-heading">
              <div>
                <div className="section-kicker"><span className="section-index">03</span><span>то, что держит нас рядом</span></div>
                <h2>Три маленьких<br /><em>обещания.</em></h2>
              </div>
              <p>Не большие слова. Просто вещи, которые я хочу делать для нас — каждый день, пока мы не встретимся.</p>
            </div>
            <div className="promise-grid">
              {promises.map((promise) => {
                const Icon = promise.icon;
                return (
                  <article className="promise-card" key={promise.number}>
                    <div className="promise-card__top"><span>{promise.number}</span><Icon size={20} /></div>
                    <div className="promise-card__bottom"><h3>{promise.title}</h3><p>{promise.text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="distance-section">
          <div className="page-wrap">
            <div className="distance-panel">
              <div className="distance-topline"><span>на карте</span><span>но не в сердце</span></div>
              <div className="route-line" aria-hidden="true">
                <div className="route-point route-point--left"><span className="route-pin"><MapPin size={15} fill="currentColor" /></span><strong>ты</strong><small>там, где сейчас</small></div>
                <div className="route-path"><span className="route-dash" /><span className="route-heart"><Heart size={18} fill="currentColor" /></span><span className="route-dash" /></div>
                <div className="route-point route-point--right"><span className="route-pin"><MapPin size={15} fill="currentColor" /></span><strong>я</strong><small>всегда рядом</small></div>
              </div>
              <div className="distance-bottomline"><span>∞ километров</span><span>0 сантиметров между нами</span></div>
            </div>
          </div>
        </section>

        <section className="final-section section-light">
          <div className="final-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="page-wrap final-content">
            <p className="eyebrow">на случай, если сегодня нужен знак</p>
            <h2>Я всё ещё<br /><em>здесь.</em></h2>
            <p className="final-subtitle">И буду рядом — в каждом сообщении, воспоминании и тёплом слове.</p>
            <button className="primary-button primary-button--dark" onClick={() => setIsLetterOpen(true)}><Mail size={18} /><span>Открыть ещё раз</span></button>
            <div className="final-signoff">с любовью, <span>твой человек</span></div>
          </div>
        </section>
      </main>

      {isLetterOpen && (
        <div className="letter-modal" role="dialog" aria-modal="true" aria-labelledby="letter-modal-title">
          <button className="modal-backdrop" aria-label="Закрыть письмо" onClick={() => setIsLetterOpen(false)} />
          <div className="modal-card">
            <button className="modal-close" aria-label="Закрыть письмо" onClick={() => setIsLetterOpen(false)}><X size={18} /></button>
            <div className="modal-card__label"><Mail size={14} /> личное письмо</div>
            <h2 id="letter-modal-title">Привет, любимая.</h2>
            <div className="modal-copy">
              <p>Если ты читаешь это ночью — знай, где-то в этом же городе или в другом часовом поясе я тоже думаю о тебе.</p>
              <p>Мне нравится, что у нас есть своё «мы», которое помещается в одно короткое сообщение, в фотографию с улицы и в обещание: мы обязательно встретимся.</p>
              <p>Спасибо, что остаёшься моей. Я очень тебя люблю. И расстояние это знает.</p>
            </div>
            <div className="modal-footer"><span>до встречи</span><Heart size={16} fill="currentColor" /></div>
          </div>
        </div>
      )}
    </div>
  );
}
