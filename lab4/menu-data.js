// Дані для меню в форматі JSON
const menuData = {
    "items": [
        {
            "title": "Головна",
            "link": "#",
            "active": true,
            "submenu": []
        },
        {
            "title": "Послуги",
            "link": "#services",
            "submenu": [
                {
                    "title": "Розробка сайтів",
                    "link": "#web-dev",
                    "submenu": [
                        {
                            "title": "Landing Page",
                            "link": "#landing"
                        },
                        {
                            "title": "Інтернет-магазин",
                            "link": "#shop"
                        },
                        {
                            "title": "Корпоративний сайт",
                            "link": "#corporate"
                        }
                    ]
                },
                {
                    "title": "Дизайн",
                    "link": "#design",
                    "submenu": [
                        {
                            "title": "Логотипи",
                            "link": "#logos"
                        },
                        {
                            "title": "Банери",
                            "link": "#banners"
                        }
                    ]
                },
                {
                    "title": "SEO-оптимізація",
                    "link": "#seo"
                }
            ]
        },
        {
            "title": "Портфоліо",
            "link": "#portfolio",
            "submenu": [
                {
                    "title": "Веб-сайти",
                    "link": "#websites"
                },
                {
                    "title": "Мобільні додатки",
                    "link": "#mobile-apps"
                },
                {
                    "title": "Корпоративний стиль",
                    "link": "#corporate-style"
                }
            ]
        },
        {
            "title": "Про нас",
            "link": "#about",
            "submenu": [
                {
                    "title": "Історія",
                    "link": "#history"
                },
                {
                    "title": "Команда",
                    "link": "#team"
                },
                {
                    "title": "Відгуки",
                    "link": "#testimonials"
                }
            ]
        },
        {
            "title": "Контакти",
            "link": "#contacts",
            "submenu": []
        }
    ]
}; 