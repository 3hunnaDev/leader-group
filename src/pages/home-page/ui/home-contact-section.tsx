import './home-contact-section.css'

const phones = ['+7 (925) 383-80-13', '+7 (926) 959-65-75', '+7 (925) 456-91-99']

export function HomeContactSection() {
  return (
    <section id="contacts" className="home-contact">
      <div className="home-contact__grid">
        <div>
          <p className="home-contact__eyebrow">Нужно больше информации?</p>
          <h2 className="home-contact__title">Напишите нам</h2>
          <p className="home-contact__description">
            Наш специалист ответит на все вопросы и подготовит коммерческое
            предложение в течение 1 рабочего дня.
          </p>
          <a
            href="https://wa.me/79801591029?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%9F%D0%BE%D1%81%D1%87%D0%B8%D1%82%D0%B0%D0%B9%D1%82%D0%B5%20%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D1%80%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5%20%D0%BF%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%21"
            target="_blank"
            rel="noreferrer"
            className="home-contact__cta"
          >
            Оставить заявку
          </a>
        </div>

        <div className="home-contact__columns">
          <div>
            <p className="home-contact__column-title">Разделы</p>
            <ul className="home-contact__list home-contact__list--menu">
              <li>Главная</li>
              <li>Ассортимент и услуги</li>
              <li>О нас</li>
              <li>Наши проекты</li>
            </ul>
          </div>
          <div>
            <p className="home-contact__column-title">Контакты</p>
            <ul className="home-contact__list home-contact__list--contacts">
              {phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="home-contact__link">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/79801591029"
                  target="_blank"
                  rel="noreferrer"
                  className="home-contact__link"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/lidergroupp"
                  target="_blank"
                  rel="noreferrer"
                  className="home-contact__link"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="home-contact__bottom">
        <p>© Leader Group</p>
        <p className="home-contact__bottom-text">
          Использование материалов сайта без официального разрешения запрещено.
        </p>
      </div>
    </section>
  )
}
