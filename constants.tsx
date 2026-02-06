
import { Milestone, GuestMessage } from './types';

export const IMAGES = {
  envelope: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwcIedN9hwoJyf4IanmPFL_hZHQlTutfV7s1RcYoHqaiW9agSCUAjpWtIB3sbUduuYLXoOT6r3xYNO8HW12m1_0FoK_pQQP9cbp2799igRnZBQz-8Dijsi8NmtNYGA4rLGZWhhOnjalIyvnARz_XE72cLofQt_RbCKK0HkewGCTmioftO8BfmMnluqBrgRN9em560R96_Q6L8GTjmMXXPOIVU9PGeFfRuHjdwvbxOof6RFgJmixZnV06ZsHVXodlPzoV-6BkRCM9s",
  date: "https://lh3.googleusercontent.com/aida-public/AB6AXuASleCnCURwvkRAkgKE-44In0UbSHdcCT9rC9fVkcAylYMoXicw26Nasd_rLWBWNjaaLBu0pvA5U3tqUahXy_9ZFU9HRKfb13psRIyWenzBuzYcysYbXNxq-RlIR48XNCNq2V5Dlm2Zs4KZ3Ba8HEvqOz5USaqsFA-yNIiNL3JUTRSgV7taT6W-6yfhbQ6j2bEXMY-gABbUWG803_joVhwSYe_2JOXcgdOeriK7K9Ty1ZKAIfMH6QbZPcEZb8JojBBE_QWH7GZNpyo",
  paris: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl_vwxYRJpqpUD2w24SuXFh70NZISVypbbUnWDt0TT3ZEfLi7W3JpRUIOuuaSLSlvKX1t35i1nhHOd-wYZ0e0WIDEF2o5IVsi5_XVTUXlho4CgrJLaPmr-oXq2TGTvRA4A43UD-l9Nqmqe48dlEiPd1Z2NvRdWXcXixRrtuMpXMiTdmPdqWH9YhFNYfBC_dcSs3-K1aaukNlHFH-Q15ke3GGx2VSrveDX4wlCMjDvMHQubDCFV7WGg5AOXPhy1HWGzgzKDTx8j9zo",
  home: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw9HynXcj5SSefrhvkU_gYn91pn3i7pjbKplu0n5tQRHeMrAAvIQOfbllYWkqaKCVY5QQU8YXL5wkQAW181t5Sz8KEZJhb6rdzyFa92N6_hjf85gKJXCqlZDL8qB4BQcopOePAxR_G5f0QtriZ7QWOW1bALwQJaY-P7qoyo92wu45Mf9ix9zcVu7cmo_bKqrGvnLpDuSRlJWRYoztr6f0RqLCgpURtxE1h5_unr_dLK8NhMX_RJQztTMIwlljIpIgHHxTJ1BNVEz8",
  beach: "https://lh3.googleusercontent.com/aida-public/AB6AXuADGsbCZOIwmClJR14yk_w7C1p3IbAjhmbBgZwYibNd40JUd75FvBcyATu9OjGFultW1njUXrvnXBhkjjh-_S_joIBL3cA6fnyGuV2mXzQHbgzgV-g1uOWMZrFfsPn7TThaMzTN13PPcC0LmEJQkSs_MyNRRp6J9sJszyzC3hEAHU3rtSuwYtM-rKej_TsnKLQNQJIDBNiN10ubXMyyNOw7gpnh1SSwvvKQpI4u3LvaaX5_xctyVr1Ssn7J-8A3X47wgw7mI4S1e0I",
  balloons: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOHr-QF12CMpQ61HgcAJ54Dnw4a88SlK6OXOlalolqX6MRoOtWNVF4iw34EZilkRqu0VqHxDrNsmX6rYVYQbqI7z1zykep6OyNiLZdrcx8ahQgxD4VXVsbdbT1l91dhKAx6RoMQYdFIqSKtYzV1AR_IvPQX2rn4JO50XMPL-EbIlz_E-zTunp-7U7xldPNZB3PsQlXody5j1dRSml_irmIvUhhrAVrQAuTxw4C-AROKsy8gFYToeSnPnRhqSw_hE4YlaQsexFq-cc",
  roses: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8QMsUi_ml_rjWva2aLXREBLlMECD563HOc-W9kMm2MNL9stNB_eWioTtzgKeNleucAsNpa7548VaaT5my9m9O4YrX0ypis4u1TskvjJX0HiRPfLkzw_sDeRZDCj2QBlYEwTAQMWyrzZp3QW6Er7_3tRflwsls2LQZn9ppyQiYHSRKDQ6-CPqxfzsdpSrZRTrh7QCPLuCCFR3fWz6Yj-nomqybi7Nk8X0x5MYCp0yccRsTmH8xKM1OZIfYotkh67Qjg9Uk0rLOwrQ",
  hands: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3oRNb2bcz1LZRP-p5zEef27zUXHyRpDh8H5OJo1cUwpB6e5hVFF3TJ2pqiBv7pN7V42tuRkvaUgukm8yU4GqHruQA0hTqA_0xY7BggDjmtYZPNvEMXyDf-nPAe3MGDKxkwaKR5AMX6X-jbTidXWAvy57TBH9fUngaH4GExcrN-hJV5h15wrfG0ZOOXYnTNZoPo55Iz8kQ8AMskDjxVD_dfSk_GL540PNEE9jEs9nb2HdWxh8wRwX-0WvYV2aq8yQvQ16TXnuiF3c",
  map: "https://lh3.googleusercontent.com/aida-public/AB6AXuAECZtRTrGQVbIVu_TvXXhXwaIi0dkT43ytgRbhLhFCjTkqVcFLe0SO3HRyPUuB9VysGoLWAE1bCAZaimOX8YCnamAtVcFUZX3YiUtM5D8unJAk12yT-tjx6RPQfva0Sp8d1auwFUjTwh36X_oW1m7W1z1fxdMiaLxWrA3dGk7YSAlF8a1n_gOQ-uhMJIoYvbVbsQZPfmiDXCUswXKy6MQMZl_PJ4LRRh8hnHnBQAjRB-UnZyfVazzHYLyjlDdwl2c0NSUpsi5iv0E",
  latte: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkNVOub4CvQ_erQiKjKQjNT5q8Gr4N_euTuiRawSLAoeXboBQSu7BlFMcRiWu81Wyl3OAqatfno4NS-FRygXHjrgHptvVvjQ8E7Jrus8GhuXYcMxmf5_3dOcRXaKnnS_xUOga5hc-kd27KPRZeVif8dWByquUi_UUUoYNLWnXXmW0nG-TUeHk1yELjzNWN0b9PJFSpG4BfEsw_fRVo4L4r4sn2-5Er0lYRxMJB5O1jVl6--YwCUUcw_T0otUJ7Codp_o_xeFOa5BA",
  park: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0JTQSlit_01qyCryY5VlzpGLZf1c_6UqpWDucBtQ1CO7bV4g2BcFwjuN3MdSJNhwCX0A7iqwUuwmr3X5DMvNWBqQgweJpwlEDoJjfh77bVj4Enb4m9YtowqU6PRZ-nLlX9J6TzKK6fr29mCV-htymfJPaCaDaylUfTBJXIwk8Ux23JuUO6TJf0TmheLFcsIKWFr4S8S2JWuXVZOnfIAmU42vD3GoMfRxOvAStgajZ2wqsQ8l3bl7Um81UYZgvqMzokbe5mqblZfA",
  rooftop: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdTa1UfjhYHhqoT-InO7OWYAYG53CH41iyRYhmkJhTyXw_CtApk3gOvK4cru4QO1m-lq4aCsdzQzKZ7O5SzKSdpqzvKp3KwYow_DVoQjzukiMxwxmMyDbjNBMgNG4NFxZUbkPUw_BPzSKqghqo2fskaSD3Bnos9bglpSzcGW4ch3mDy6204yRYzEequ0pE0ZphLkmPwrbkDG5Vt5_GAWFeX55BXM15DwhXM9us0bhmxY3iWUb4TJBbRFXw6N3eqSNbQUvI2DiiExI",
  kyoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTnRtslyQMPzqC4qt5sK5uz4FVrfAlIrXmWelM_O4DZ6I0qsSAHRXhmNW7qmAyhC1VUftd8oboch_1Sgyp5_8s-KTECzihV6WdH81vN5MXoe3gOvKmqPhMiXWO93doUrXIF6je8chyXan1H2MPDHxGvycDchiUNoaR7-HenaJgQy7FgFJ9WLqu_kw_tg79icCXRDIyiEtwIt4LKfvdZCzlLJAaaPZ6jw7ws-jrbpkl0pCppKlJBgkVqKAHxxXe5thqN17ZiYtceSo",
};

export const MILESTONES: Milestone[] = [
  {
    id: '1',
    date: 'Step 01',
    title: 'Precision Personalization',
    description: "Our engine allows you to anchor your invitation with their name and image, creating a 1:1 bond that felt generic before.",
    image: IMAGES.date,
    type: 'date'
  },
  {
    id: '2',
    date: 'Step 02',
    title: 'The Evasive Logic',
    description: 'We developed a proprietary "No" button that playfully avoids rejection, ensuring the only outcome is a shared smile.',
    image: IMAGES.paris,
    type: 'travel'
  },
  {
    id: '3',
    date: 'Step 03',
    title: 'AI Vow Generation',
    description: 'Leveraging Gemini, we craft a unique certificate of love that articulates your feelings in ways common words cannot.',
    image: IMAGES.home,
    type: 'home'
  },
  {
    id: '4',
    date: 'Step 04',
    title: 'Digital Keepsake',
    description: 'Once they say YES, you receive a verified certificate of your bond, a permanent index of this moment in time.',
    image: IMAGES.beach,
    type: 'success'
  }
];

export const GUESTBOOK: GuestMessage[] = [
  {
    id: '1',
    author: 'Alex P.',
    avatar: 'https://picsum.photos/seed/alex/100',
    content: '"The interactive NO button made her laugh so much. It turned a simple question into a fun memory!"',
  },
  {
    id: '2',
    author: 'Jordan K.',
    avatar: 'https://picsum.photos/seed/jordan/100',
    content: '"The AI letter was surprisingly deep. It captured exactly what I wanted to say but didn\'t have the words for."',
  },
  {
    id: '3',
    author: 'Lover Elite',
    avatar: 'https://picsum.photos/seed/lover/100',
    content: '"Finally, a Valentine platform that feels premium and personal. Best way to celebrate 2026."',
    isFeatured: true
  }
];
