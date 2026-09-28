import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Gift,
  Heart,
  Mail,
  MapPin,
  Moon,
  Play,
  Quote,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { driveMedia, type DriveMedia, type DriveMediaKind } from "@/lib/mediaManifest";

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

const warmMessages = [
  "Я скучаю по тебе сильнее, чем умею сказать.",
  "Ты — моё самое любимое «мы».",
  "Я рядом. Даже когда между нами километры.",
  "Обнимаю тебя мысленно прямо сейчас.",
  "Скорее бы снова увидеть твою улыбку.",
  "Ты у меня самая родная.",
];

export default function Home() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [mediaFilter, setMediaFilter] = useState<DriveMediaKind | "all">("all");
  const [activeMedia, setActiveMedia] = useState<DriveMedia | null>(null);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [missNote, setMissNote] = useState<string | null>(null);
  const [heartBurst, setHeartBurst] = useState<Array<{ id: number; left: number; delay: number; size: number; rotate: number }>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const daysTogether = useMemo(() => {
    const start = new Date("2025-09-25T00:00:00");
    const today = new Date();
    return Math.max(0, Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000));
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const startMusicAfterGesture = () => {
      const audio = audioRef.current;
      if (!audio || musicEnabled) return;
      audio.muted = false;
      audio.volume = 0.18;
      void audio.play().then(() => setMusicEnabled(true)).catch(() => undefined);
    };
    window.addEventListener("pointerdown", startMusicAfterGesture, { once: true });
    return () => window.removeEventListener("pointerdown", startMusicAfterGesture);
  }, [musicEnabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeMedia && activeMedia.kind !== "photo") {
      audio.pause();
    } else if (musicEnabled && audio.paused) {
      void audio.play().catch(() => undefined);
    }
  }, [activeMedia, musicEnabled]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicEnabled) {
      audio.pause();
      setMusicEnabled(false);
    } else {
      audio.muted = false;
      audio.volume = 0.18;
      void audio.play().then(() => setMusicEnabled(true)).catch(() => undefined);
    }
  };

  const handleMiss = () => {
    const burst = Array.from({ length: 18 }, (_, index) => ({
      id: Date.now() + index,
      left: 8 + Math.random() * 84,
      delay: Math.random() * 0.3,
      size: 15 + Math.random() * 18,
      rotate: -28 + Math.random() * 56,
    }));
    setHeartBurst(burst);
    setMissNote(warmMessages[Math.floor(Math.random() * warmMessages.length)]);
    window.setTimeout(() => { setHeartBurst([]); setMissNote(null); }, 3600);
  };

  const visibleMedia = mediaFilter === "all" ? driveMedia : driveMedia.filter((media) => media.kind === mediaFilter);
  const mediaCount = (kind: DriveMediaKind) => driveMedia.filter((media) => media.kind === kind).length;

  return (
    <div className="site-shell">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/quiet-between-us.mp3`} autoPlay muted loop preload="auto" aria-hidden="true" />
      <button className={`music-control ${musicEnabled ? "music-control--on" : ""}`} onClick={toggleMusic} aria-label={musicEnabled ? "Выключить музыку" : "Включить музыку"}>
        <span className="music-control__pulse" />
        {musicEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
        <span>{musicEnabled ? "музыка рядом" : "включить музыку"}</span>
      </button>
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
                <span>Письмо</span>
                <ArrowDownRight size={18} />
              </a>
              <button className="miss-button" onClick={handleMiss}>
                <Heart size={16} fill="currentColor" /> <span>Скучаю</span>
              </button>
            </div>
            <div className="hero-note" aria-label="Небольшая заметка">
              <div className="hero-note__top"><Moon size={15} /><span>заметка · 23:47</span></div>
              <p>«Иногда скучать — это просто ещё один способ сказать: ты мне очень нужна».</p>
              <div className="hero-note__line"><span /> <span>люблю тебя</span></div>
            </div>
          </div>
          <div className="together-counter page-wrap" aria-label={`Мы вместе уже ${daysTogether} дней`}>
            <div className="together-counter__heart"><Heart size={19} fill="currentColor" /></div>
            <div><span>мы вместе уже больше года</span></div>
            <small>с 25 сентября 2025</small>
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
                <div className="letter-card__signature">твой любимый<span>.</span></div>
              </div>
              <div className="side-caption"><span className="side-caption__line" /> расстояние — это просто цифра</div>
            </div>
          </div>
        </section>

        <section className="media-section section-light" id="memories">
          <div className="page-wrap">
            <div className="section-heading media-heading">
              <div>
                <div className="section-kicker"><span className="section-index">02</span><span>маленькая выставка нас</span></div>
                <h2>Вспоминай<br /><em>нас.</em></h2>
              </div>
              <p>Все наши фото, видео и кружки собраны в одном тёплом месте. Можно листать, открывать и снова находить любимые моменты.</p>
            </div>
            <div className="media-toolbar" role="tablist" aria-label="Фильтр материалов">
              {([
                ["all", "всё", driveMedia.length],
                ["photo", "фото", mediaCount("photo")],
                ["video", "видео", mediaCount("video")],
                ["circle", "кружки", mediaCount("circle")],
              ] as const).map(([kind, label, count]) => (
                <button key={kind} className={`media-tab ${mediaFilter === kind ? "media-tab--active" : ""}`} onClick={() => setMediaFilter(kind)} role="tab" aria-selected={mediaFilter === kind}>
                  <span>{label}</span><small>{count}</small>
                </button>
              ))}
            </div>
            <div className="drive-gallery">
              {visibleMedia.map((media, index) => (
                <button className={`drive-item drive-item--${media.kind}`} key={media.id} onClick={() => setActiveMedia(media)} aria-label={`Открыть ${media.name}`}>
                  <img src={media.thumb} alt={media.name} loading={index < 8 ? "eager" : "lazy"} />
                  {media.kind !== "photo" && <span className="drive-play"><Play size={16} fill="currentColor" /></span>}
                  <span className="drive-item__meta"><span>{media.kind === "photo" ? "фото" : media.kind === "circle" ? "кружок" : "видео"}</span><span>{String(index + 1).padStart(2, "0")}</span></span>
                </button>
              ))}
            </div>
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
              <div className="distance-topline"><span>маленькая карта между нами</span><span>одна страна · два города</span></div>
              <div className="route-map" aria-label="Карта расстояния между Христиновкой и тобой">
                <div className="map-grid" aria-hidden="true" />
                <svg className="map-route" viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true">
                  <path className="map-route__shadow" d="M104 121 C220 32, 344 150, 474 76 S655 31, 700 74" />
                  <path className="map-route__line" d="M104 121 C220 32, 344 150, 474 76 S655 31, 700 74" />
                </svg>
                <div className="map-distance"><Heart size={14} fill="currentColor" /><strong>253 километра</strong><span>между нами</span></div>
                <div className="map-city map-city--left"><span className="map-city__pin"><MapPin size={16} fill="currentColor" /></span><strong>ты</strong><small>Христиновка</small></div>
                <div className="map-city map-city--right"><span className="map-city__pin"><MapPin size={16} fill="currentColor" /></span><strong>я</strong><small>всегда рядом</small></div>
                <span className="map-star map-star--one" aria-hidden="true">✦</span><span className="map-star map-star--two" aria-hidden="true">·</span><span className="map-star map-star--three" aria-hidden="true">✦</span>
              </div>
              <div className="distance-bottomline"><span>253 километров</span><span>25300000 сантиметров между нами</span></div>
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
            <div className="final-signoff">с любовью, <span>твой Леша</span></div>
          </div>
        </section>
      </main>

      {heartBurst.length > 0 && <div className="heart-burst" aria-hidden="true">{heartBurst.map((heart) => <Heart key={heart.id} className="burst-heart" fill="currentColor" style={{ left: `${heart.left}%`, animationDelay: `${heart.delay}s`, fontSize: `${heart.size}px`, transform: `rotate(${heart.rotate}deg)` }} />)}</div>}
      {missNote && <div className="miss-note" role="status"><Heart size={16} fill="currentColor" /><span>{missNote}</span></div>}

      {activeMedia && (
        <div className="media-modal" role="dialog" aria-modal="true" aria-label={`Просмотр ${activeMedia.name}`}>
          <button className="modal-backdrop" aria-label="Закрыть просмотр" onClick={() => setActiveMedia(null)} />
          <div className={`media-modal__card media-modal__card--${activeMedia.kind}`}>
            <button className="modal-close" aria-label="Закрыть просмотр" onClick={() => setActiveMedia(null)}><X size={18} /></button>
            {activeMedia.kind === "photo" ? <img src={activeMedia.thumb} alt={activeMedia.name} /> : <iframe src={activeMedia.preview} title={activeMedia.name} allow="autoplay; fullscreen" allowFullScreen />}
            <div className="media-modal__caption"><span>{activeMedia.kind === "circle" ? "кружок из Telegram" : activeMedia.kind === "video" ? "ваше видео" : "ваше фото"}</span><strong>{activeMedia.kind === "photo" ? "любимое фото" : activeMedia.kind === "circle" ? "твой голос рядом" : "наш момент"}</strong></div>
          </div>
        </div>
      )}

      {isLetterOpen && (
        <div className="letter-modal" role="dialog" aria-modal="true" aria-labelledby="letter-modal-title">
          <button className="modal-backdrop" aria-label="Закрыть письмо" onClick={() => setIsLetterOpen(false)} />
          <div className="modal-card">
            <button className="modal-close" aria-label="Закрыть письмо" onClick={() => setIsLetterOpen(false)}><X size={18} /></button>
            <div className="modal-card__label"><Mail size={14} /> личное письмо</div>
            <h2 id="letter-modal-title">Привет, любимая.</h2>
            <div className="modal-copy">
              <p>Пусть сейчас между нами разные области, мы всё равно в одной стране — и в моём сердце ты совсем рядом.</p>
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
