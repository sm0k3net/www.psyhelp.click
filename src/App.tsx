import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Плавный скролл для всех ссылок с href="#..."
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = (this as HTMLAnchorElement).getAttribute('href')?.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          // Подсветка активной ссылки в меню
          if (this.classList.contains('nav-link')) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
          }
        }
      });
    });

    // Обработчик контактной формы
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageEl = document.getElementById('formMessage');
        if (messageEl) {
          messageEl.textContent = 'Спасибо! Ваше сообщение отправлено.';
        }
        this.reset();
      });
    }
  }, []);

  return (
    <>
      <header className="sticky-header">
        <div className="container header-content">
          <img src="/logo.png" alt="PsyHelp.Click Logo" className="logo" width="64" height="64" />
          <nav>
            <ul>
              <li><a href="#about" className="nav-link">О Нас</a></li>
              <li><a href="#consultations" className="nav-link">Консультации</a></li>
              <li><a href="#directions" className="nav-link">Направления</a></li>
              <li><a href="#contacts" className="nav-link">Контакты</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        {/* Главная секция */}
        <section id="main-offer" className="about-section">
          <div className="container about-hero-new">
            <h1 className="about-h1">Профессиональная <span className="gradient-text">психологическая помощь</span> онлайн</h1>
            <p className="about-p">
              Доступная, конфиденциальная и эффективная психологическая поддержка с использованием современных технологий искусственного интеллекта
            </p>
            <div className="about-buttons-new">
              <a href="#consultations" className="btn btn-main">Начать консультацию</a>
              <a href="#about-project" className="btn btn-outline">Узнать больше</a>
            </div>
            <div className="about-icons-row">
              <div className="about-icon-block">
                <div className="advantage-icon">🔒</div>
                <span>100% конфиденциально</span>
              </div>
              <div className="about-icon-block">
                <div className="advantage-icon">🕒</div>
                <span>24/7 доступность</span>
              </div>
              <div className="about-icon-block">
                <div className="advantage-icon">✓</div>
                <span>Профессионально</span>
              </div>
              <div className="about-icon-block">
                <div className="advantage-icon">💰</div>
                <span>Доступные цены</span>
              </div>
            </div>
          </div>
        </section>

        {/* О нашем проекте */}
        <section id="about-project" className="about-project-section">
          <div className="container">
            <h2>О нашем проекте</h2>
            <p>
              PsyHelp.Click — это современная платформа психологической поддержки, которая объединяет профессиональный опыт психологов с возможностями искусственного интеллекта. Мы создали безопасное пространство, где каждый может получить качественную психологическую помощь в удобном формате.
            </p>
            <p>
              Наша миссия — сделать психологическую поддержку доступной, понятной и эффективной для каждого человека. Мы верим в силу доверительных отношений и индивидуального подхода, обеспечивая при этом гибкость и удобство современных технологий.
            </p>
          </div>
        </section>

        {/* Консультации */}
        <section id="consultations" className="section consultations-section">
          <div className="container">
            <h2>Консультации</h2>
            <h4>Онлайн-формат — это удобно, безопасно и эффективно. Вы можете выбрать наиболее комфортный способ общения, сохраняя анонимность и гибкость. Все консультации проходят в защищённом формате, а ваши данные остаются приватными.</h4>
            <div className="consultation-options">
              <div className="consultation-circle" data-type="chat">
                <span className="circle-icon">💬</span>
                <span className="circle-text">Чат<br />(Telegram / Сайт)</span>
              </div>
              <div className="consultation-circle" data-type="live">
                <span className="circle-icon">🎥</span>
                <span className="circle-text">Онлайн сессия<br />(аудио/видео)</span>
              </div>
              <div className="consultation-circle" data-type="audio">
                <span className="circle-icon">🎤</span>
                <span className="circle-text">Аудио сообщения<br />(Telegram)</span>
              </div>
              <div className="consultation-circle" data-type="email">
                <span className="circle-icon">✉️</span>
                <span className="circle-text">Email</span>
              </div>
            </div>
          </div>
        </section>

        {/* Направления */}
        <section id="directions" className="section directions-section">
          <div className="container">
            <h2>Направления</h2>
            <div className="direction-plates">
              <div className="direction-plate">
                <h3>Индивидуальные консультации</h3>
                <p>Персональный подход, конфиденциальность, гибкий график, рекомендации и поддержка для личного развития и преодоления трудностей.</p>
              </div>
              <div className="direction-plate">
                <h3>Малые группы (до 5 участников)</h3>
                <p>Групповая динамика, обмен опытом, поддержка единомышленников, совместное решение проблем и развитие навыков коммуникации.</p>
              </div>
              <div className="direction-plate">
                <h3>Семейные консультации (взрослые, до 2 участников)</h3>
                <p>Работа с семейными вопросами, улучшение взаимопонимания, совместное преодоление кризисов, укрепление отношений.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section id="contacts" className="section contacts-section">
          <div className="container contacts-flex">
            <div className="contact-form-block">
              <h2>Связаться с нами</h2>
              <form id="contactForm">
                <input type="text" name="name" placeholder="Имя (необязательно)" />
                <input type="email" name="email" placeholder="Email (обязательно)" required />
                <input type="text" name="telegram" placeholder="Telegram (необязательно)" />
                <input type="text" name="topic" placeholder="Тема обращения (обязательно)" required />
                <button type="submit">Отправить</button>
              </form>
              <div id="formMessage"></div>
            </div>
            <div className="contact-info-block">
              <div className="contact-plate">
                <span className="contact-icon">✉️</span>
                <span className="contact-text"><a href="mailto:contact@psyhelp.click">contact@psyhelp.click</a></span>
              </div>
              <div className="contact-plate">
                <span className="contact-icon">💬</span>
                <span className="contact-text"><a href="https://t.me/psyhelpclick" target="_blank">@psyhelpclick</a></span>
              </div>
              <div className="contact-plate">
                <span className="contact-icon">📅</span>
                <span className="contact-text"><a href="https://calendly.com/" target="_blank">Онлайн звонок</a></span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer>
        <div className="container">
          &copy; 2025 PsyHelp.Click — Профессиональная психологическая помощь онлайн
        </div>
      </footer>
    </>
  );
}

export default App;