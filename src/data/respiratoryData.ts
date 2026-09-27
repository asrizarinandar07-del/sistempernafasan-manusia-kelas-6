import { OrganInfo, AirwayStep, ProcessStep, QuizQuestion, QuizPackage } from '../types';

export const ORGANS_DATA: OrganInfo[] = [
  {
    id: 'rongga-hidung',
    name: 'Rongga hidung',
    altName: 'Cavum Nasi',
    description: 'Pintu utama masuknya udara pernapasan ke dalam tubuh manusia yang dilengkapi dengan rambut hidung dan selaput lendir.',
    functions: [
      'Menyaring debu, kotoran, dan kuman yang terbawa udara menggunakan rambut hidung (silia).',
      'Menghangatkan suhu udara yang masuk agar sesuai dengan suhu tubuh manusia melalui kapiler darah halus.',
      'Melembapkan udara kering agar tidak mengeringkan dan mengiritasi saluran paru-paru.'
    ],
    keyFact: 'Di dalam rongga hidung terdapat reseptor penciuman (olfaktori) yang membuat kita bisa mencium aroma lezat masakan atau bau bahaya!',
    pathwayOrder: 1,
    position: { x: 52, y: 14 },
    labelPos: 'left',
    badgeColor: 'bg-sky-500'
  },
  {
    id: 'rongga-mulut',
    name: 'Rongga mulut',
    altName: 'Cavum Oris',
    description: 'Pintu masuk alternatif udara ketika rongga hidung tersumbat karena flu atau saat tubuh memerlukan pasokan oksigen yang sangat banyak.',
    functions: [
      'Sebagai jalur darurat atau alternatif masuknya udara pernapasan.',
      'Membantu asupan oksigen saat berolahraga intensitas tinggi ketika bernapas lewat hidung tidak mencukupi.'
    ],
    keyFact: 'Bernapas lewat mulut tidak menyaring kotoran dan tidak melembapkan udara sebaik hidung, sehingga bernapas lewat hidung tetap paling utama.',
    pathwayOrder: 2,
    position: { x: 49, y: 19 },
    labelPos: 'left',
    badgeColor: 'bg-sky-600'
  },
  {
    id: 'faring',
    name: 'Faring (tenggorokan)',
    altName: 'Pharynx',
    description: 'Saluran persimpangan berbentuk tabung yang menghubungkan bagian belakang rongga hidung dan mulut menuju ke laring dan esofagus.',
    functions: [
      'Menghubungkan rongga hidung dan rongga mulut ke laring.',
      'Meneruskan udara pernapasan dari hidung ke saluran napas bagian bawah.',
      'Berperan ganda sebagai saluran pencernaan makanan dan saluran napas udara.'
    ],
    keyFact: 'Faring memiliki tiga bagian: nasofaring (belakang hidung), orofaring (belakang mulut), dan laringofaring (dekat pita suara).',
    pathwayOrder: 3,
    position: { x: 44, y: 24 },
    labelPos: 'left',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'laring',
    name: 'Laring (kotak suara)',
    altName: 'Larynx',
    description: 'Organ berongga yang terletak di bagian leher atas, berfungsi sebagai saluran udara sekaligus wadah bagi pita suara dan katup epiglotis.',
    functions: [
      'Mengatur masuknya makanan dan udara melalui katup epiglotis agar kita tidak tersedak.',
      'Memproduksi suara ketika udara berhembus menggetarkan pita suara (vocal cords).',
      'Memicu refleks batuk jika ada benda asing atau air yang masuk ke saluran napas.'
    ],
    keyFact: 'Epiglotis akan otomatis menutup saluran napas saat kamu menelan makanan, dan terbuka lebar saat kamu bernapas!',
    pathwayOrder: 4,
    position: { x: 43, y: 29 },
    labelPos: 'left',
    badgeColor: 'bg-indigo-500'
  },
  {
    id: 'trakea',
    name: 'Trakea (batang tenggorokan)',
    altName: 'Trachea',
    description: 'Pipa elastis sepanjang sekitar 10–12 cm yang tersusun dari cincin tulang rawan berbentuk huruf C, menghubungkan laring dengan bronkus.',
    functions: [
      'Menyalurkan udara yang bersih dan hangat menuju ke bronkus dan kedua paru-paru.',
      'Memiliki lapisan sel bersilia yang bergerak menyapu debu dan kuman ke atas menuju kerongkongan untuk dibatukkan atau ditelan.',
      'Cincin tulang rawan menjaga trakea agar tidak mudah kempis saat kita menarik napas.'
    ],
    keyFact: 'Bentuk cincin tulang rawan seperti huruf C sengaja terbuka di bagian belakang agar esofagus (saluran makan) bisa melebar saat menelan makanan.',
    pathwayOrder: 5,
    position: { x: 42, y: 38 },
    labelPos: 'left',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'bronkus',
    name: 'Bronkus',
    altName: 'Bronchi (Kanan & Kiri)',
    description: 'Dua percabangan utama dari ujung trakea yang masing-masing masuk ke dalam paru-paru kanan dan paru-paru kiri.',
    functions: [
      'Membagi dan menghantarkan aliran udara secara seimbang ke paru-paru kanan dan kiri.',
      'Bercabang lagi menjadi saluran-saluran yang lebih kecil yang disebut bronkiolus.',
      'Melindungi paru-paru dari infeksi melalui lendir perangkap kotoran.'
    ],
    keyFact: 'Bronkus kanan posisinya lebih tegak, lebih pendek, dan lebih lebar daripada bronkus kiri, sehingga benda asing yang tertelan lebih sering masuk ke paru-paru kanan!',
    position: { x: 38, y: 48 },
    labelPos: 'left',
    badgeColor: 'bg-cyan-600'
  },
  {
    id: 'paru-kanan',
    name: 'Paru-paru kanan',
    altName: 'Pulmo Dexter',
    description: 'Organ pernapasan utama di sisi kanan rongga dada yang terdiri dari 3 gelambir (lobus superior, medius, dan inferior).',
    functions: [
      'Menampung jutaan alveolus untuk pertukaran gas oksigen dan karbon dioksida.',
      'Ukurannya sedikit lebih besar dan lebih berat daripada paru-paru kiri karena tidak terdesak oleh posisi jantung.'
    ],
    keyFact: 'Paru-paru kanan memiliki 3 lobus sedangkan paru-paru kiri hanya 2 lobus karena sebagian ruang di kiri digunakan untuk menampung organ jantung.',
    position: { x: 34, y: 53 },
    labelPos: 'left',
    badgeColor: 'bg-rose-500'
  },
  {
    id: 'paru-kiri',
    name: 'Paru-paru kiri',
    altName: 'Pulmo Sinister',
    description: 'Organ pernapasan di sisi kiri rongga dada yang memiliki lekukan kardiak (ruang untuk jantung) dan terbagi menjadi 2 gelambir.',
    functions: [
      'Menyediakan permukaan luas bagi pertukaran oksigen menuju aliran darah seluruh tubuh.',
      'Mengembang saat menghirup udara (inspirasi) dan mengempis saat menghembuskan napas (ekspirasi).'
    ],
    keyFact: 'Jika seluruh permukaan alveolus di kedua paru-paru dibentangkan, luasnya setara dengan lapangan bulu tangkis atau lapangan tenis (~75 meter persegi)!',
    position: { x: 53, y: 53 },
    labelPos: 'right',
    badgeColor: 'bg-rose-500'
  },
  {
    id: 'diafragma',
    name: 'Diafragma',
    altName: 'Diaphragma Thoracis',
    description: 'Otot tipis berbentuk kubah yang membatasi rongga dada dan rongga perut, merupakan otot penggerak utama pernapasan manusia.',
    functions: [
      'Saat menarik napas (inspirasi): diafragma berkontraksi dan mendatar, volume rongga dada membesar, tekanan turun sehingga udara masuk.',
      'Saat membuang napas (ekspirasi): diafragma berelaksasi dan melengkung ke atas, volume rongga dada menyusut, mendorong udara keluar.',
      'Membantu pernapasan perut yang dalam dan menenangkan.'
    ],
    keyFact: 'Cegukan (hiccups) terjadi akibat kontraksi atau kejang tiba-tiba dan tak terkendali pada otot diafragma kita!',
    position: { x: 42, y: 65 },
    labelPos: 'left',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'alveolus',
    name: 'Alveolus',
    altName: 'Alveoli (Tempat Pertukaran Gas)',
    description: 'Kantung-kantung udara mikroskopis di ujung bronkiolus yang tersusun seperti gugusan buah anggur dan dikelilingi oleh jaring kapiler darah halus.',
    functions: [
      'Tempat terjadinya difusi pertukaran gas: oksigen (O₂) menembus dinding tipis alveolus masuk ke sel darah merah.',
      'Mengeluarkan karbon dioksida (CO₂) dari darah ke dalam rongga alveolus untuk dihembuskan keluar tubuh.',
      'Dindingnya sangat tipis (hanya satu lapis sel) untuk mempermudah difusi gas dengan cepat.'
    ],
    keyFact: 'Manusia memiliki sekitar 300 hingga 500 juta alveolus di dalam kedua paru-parunya!',
    position: { x: 62, y: 49 },
    labelPos: 'right',
    badgeColor: 'bg-red-500'
  }
];

export const AIRWAY_STEPS: AirwayStep[] = [
  {
    step: 1,
    name: 'Rongga hidung',
    description: 'Menyaring, menghangatkan, dan melembapkan udara.',
    detail: 'Udara masuk pertama kali melalui rongga hidung. Rambut hidung menyaring partikel debu, selaput lendir melembapkan, dan kapiler darah menghangatkan udara hingga sesuai suhu tubuh kita.',
    iconType: 'wind'
  },
  {
    step: 2,
    name: 'Rongga mulut',
    description: 'Jalur alternatif masuknya udara.',
    detail: 'Ketika hidung tersumbat atau saat kita membutuhkan banyak udara (seperti saat berlari kencang), rongga mulut menjadi jalur cadangan yang cepat bagi udara untuk masuk.',
    iconType: 'smile'
  },
  {
    step: 3,
    name: 'Faring',
    description: 'Menghubungkan rongga hidung/mulut ke laring.',
    detail: 'Faring adalah persimpangan penting antara saluran pernapasan (ke laring) dan saluran pencernaan (ke kerongkongan). Udara dialirkan lancar melintasi faring menuju laring.',
    iconType: 'git-merge'
  },
  {
    step: 4,
    name: 'Laring',
    description: 'Mengatur masuknya makanan dan udara.',
    detail: 'Laring memiliki katup epiglotis yang membuka saat bernapas dan menutup otomatis saat kita menelan makanan agar tidak tersedak. Di laring juga terdapat pita suara.',
    iconType: 'mic'
  },
  {
    step: 5,
    name: 'Trakea',
    description: 'Menyalurkan udara ke bronkus.',
    detail: 'Pipa batang tenggorokan yang kokoh namun elastis karena diperkuat cincin tulang rawan. Sel bersilia di dalamnya terus menyapu kotoran halus keluar dari paru-paru.',
    iconType: 'git-commit'
  }
];

export const FUNCTIONS_LIST = [
  {
    title: 'Mengambil oksigen (O₂) dari udara',
    desc: 'Oksigen dari udara bebas dihirup masuk ke paru-paru, lalu ditransfer ke peredaran darah untuk disalurkan ke seluruh sel tubuh.',
    tag: 'Fungsi Utama'
  },
  {
    title: 'Mengeluarkan karbon dioksida (CO₂)',
    desc: 'Karbon dioksida adalah limbah berbahaya dari hasil pembakaran energi di dalam sel, yang harus segera dibuang melalui hembusan napas.',
    tag: 'Detoksifikasi Gas'
  },
  {
    title: 'Membantu menjaga keseimbangan asam-basa dalam tubuh',
    desc: 'Dengan mengatur laju pengeluaran CO₂, sistem pernapasan menjaga pH cairan darah dan tubuh tetap stabil dan seimbang (pH 7.35 - 7.45).',
    tag: 'Homeostasis'
  },
  {
    title: 'Menyediakan energi untuk aktivitas tubuh',
    desc: 'Oksigen yang diserap digunakan oleh mitokondria di dalam sel untuk membakar glukosa, menghasilkan energi (ATP) untuk belajar, bermain, dan berolahraga.',
    tag: 'Produksi Energi'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Udara masuk',
    subtitle: 'Melalui hidung atau mulut menuju trakea',
    description: 'Otot diafragma berkontraksi dan rongga dada membesar. Tekanan udara di dalam paru-paru turun sehingga udara kaya oksigen mengalir masuk melalui hidung atau mulut.',
    badge: 'Inspirasi',
    tag: 'Langkah 1'
  },
  {
    step: 2,
    title: 'Udara menuju paru-paru',
    subtitle: 'Melalui trakea, bronkus, dan bronkiolus',
    description: 'Udara mengalir menyusuri trakea (batang tenggorokan), bercabang ke bronkus kanan dan kiri, lalu menyebar ke percabangan yang lebih halus yaitu bronkiolus.',
    badge: 'Distribusi',
    tag: 'Langkah 2'
  },
  {
    step: 3,
    title: 'Pertukaran gas',
    subtitle: 'Oksigen masuk ke darah, karbon dioksida keluar',
    description: 'Di dalam alveolus yang mirip buah anggur, molekul oksigen (O₂) menembus dinding kapiler darah, sedangkan karbon dioksida (CO₂) dari darah menyeberang ke alveolus.',
    badge: 'Difusi Alveolus',
    tag: 'Langkah 3'
  },
  {
    step: 4,
    title: 'Oksigen ke seluruh tubuh',
    subtitle: 'Dibawa oleh darah ke sel-sel tubuh',
    description: 'Oksigen diikat oleh hemoglobin pada sel darah merah (eritrosit) dan dipompa oleh jantung ke otak, otot, dan seluruh organ untuk respirasi sel.',
    badge: 'Sirkulasi Darah',
    tag: 'Langkah 4'
  },
  {
    step: 5,
    title: 'Karbon dioksida keluar',
    subtitle: 'Dikeluarkan melalui hidung atau mulut',
    description: 'Otot diafragma berelaksasi dan rongga dada mengempis. Udara yang mengandung karbon dioksida terdorong keluar dari paru-paru menuju atmosfer.',
    badge: 'Ekspirasi',
    tag: 'Langkah 5'
  },
  {
    step: 6,
    title: 'Tubuh tetap sehat',
    subtitle: 'Energi tercukupi, tubuh bekerja optimal',
    description: 'Dengan pasokan oksigen yang lancar dan pembuangan limbah gas yang bersih, seluruh sel tubuh memiliki cukup energi sehingga kita tetap bugar, fokus, dan bersemangat!',
    badge: 'Kebugaran & Vitalitas',
    tag: 'Langkah 6'
  }
];

export const QUIZ_PACKAGES: QuizPackage[] = [
  {
    id: 'paket-a',
    title: 'Paket A: Organ & Jalur Udara',
    badge: 'Anatomi & Struktur',
    description: 'Mengenal struktur organ pernapasan manusia, urutan jalur masuknya udara, dan fungsi masing-masing organ.',
    iconName: 'Layers',
    colorTheme: 'from-sky-600 to-cyan-600',
    questions: [
      {
        id: 1,
        question: 'Berdasarkan poster sistem pernapasan, apa fungsi utama dari Rongga Hidung?',
        options: [
          'Menyaring, menghangatkan, dan melembapkan udara',
          'Mengatur masuknya makanan dan udara',
          'Memompa darah ke seluruh jaringan tubuh',
          'Tempat penyerapan sari-sari makanan'
        ],
        correctAnswer: 0,
        explanation: 'Rongga hidung memiliki rambut hidung untuk menyaring debu, kapiler darah untuk menghangatkan suhu udara, dan lendir untuk melembapkan udara sebelum masuk ke paru-paru.',
        hint: 'Perhatikan nomor 1 pada Jalur Udara Pernapasan di poster.'
      },
      {
        id: 2,
        question: 'Bagian manakah yang berfungsi sebagai persimpangan antara rongga hidung/mulut menuju ke laring?',
        options: [
          'Bronkus',
          'Faring (tenggorokan)',
          'Diafragma',
          'Alveolus'
        ],
        correctAnswer: 1,
        explanation: 'Faring merupakan saluran persimpangan yang menghubungkan rongga hidung dan rongga mulut menuju ke laring saluran napas.',
        hint: 'Organ ini bernomor urut 3 pada jalur udara pernapasan.'
      },
      {
        id: 3,
        question: 'Organ apakah yang memiliki katup epiglotis untuk mengatur agar makanan tidak masuk ke saluran napas?',
        options: [
          'Laring (kotak suara)',
          'Rongga mulut',
          'Bronkus kanan',
          'Paru-paru kanan'
        ],
        correctAnswer: 0,
        explanation: 'Laring memiliki katup penutup bernama epiglotis yang secara otomatis menutup saluran napas saat menelan makanan sehingga kita tidak tersedak.',
        hint: 'Organ ini juga dikenal sebagai kotak suara karena memiliki pita suara dan tonjolan jakun.'
      },
      {
        id: 4,
        question: 'Apa fungsi dari cincin-cincin tulang rawan berbentuk huruf C pada dinding Trakea (batang tenggorokan)?',
        options: [
          'Menghasilkan suara keras saat berteriak',
          'Menjaga saluran napas tetap terbuka dan kokoh agar tidak mengempis',
          'Menyerap sari makanan yang masuk',
          'Memompa oksigen langsung ke jantung'
        ],
        correctAnswer: 1,
        explanation: 'Dinding trakea diperkuat oleh cincin tulang rawan agar saluran napas tetap terbuka lebar dan kokoh, baik saat udara ditarik masuk maupun dihembuskan keluar.',
        hint: 'Tulang rawan berfungsi sebagai penyangga elastis yang kuat.'
      },
      {
        id: 5,
        question: 'Saluran yang merupakan percabangan dari trakea menuju paru-paru kanan dan paru-paru kiri disebut...',
        options: [
          'Bronkus',
          'Epiglotis',
          'Faring',
          'Diafragma'
        ],
        correctAnswer: 0,
        explanation: 'Bronkus adalah percabangan utama trakea menjadi dua cabang: bronkus kanan menuju paru-paru kanan dan bronkus kiri menuju paru-paru kiri.',
        hint: 'Di dalam paru-paru, cabang ini akan bercabang lagi menjadi bronkiolus yang lebih halus.'
      },
      {
        id: 6,
        question: 'Mengapa paru-paru kanan memiliki 3 gelambir (lobus) sedangkan paru-paru kiri hanya memiliki 2 gelambir?',
        options: [
          'Karena paru-paru kanan bekerja lebih keras dari paru-paru kiri',
          'Karena di sisi dada sebelah kiri terdapat organ jantung yang membutuhkan ruang',
          'Karena paru-paru kiri tidak memiliki kantung alveolus',
          'Karena diafragma hanya menempel pada bagian paru-paru kanan'
        ],
        correctAnswer: 1,
        explanation: 'Posisi organ jantung condong ke sisi kiri rongga dada, sehingga paru-paru kiri lebih ramping dan hanya memiliki 2 lobus untuk memberikan ruang bagi jantung.',
        hint: 'Pikirkan organ pemompa darah yang terletak agak miring ke sisi dada kiri.'
      },
      {
        id: 7,
        question: 'Kapan rongga mulut berperan penting sebagai jalur masuknya udara pernapasan alternatif?',
        options: [
          'Hanya saat kita sedang tertidur lelap',
          'Saat hidung tersumbat atau ketika tubuh membutuhkan pasokan udara cepat saat berlari',
          'Saat kita sedang menyelam di dasar laut',
          'Hanya ketika kita sedang mengunyah makanan keras'
        ],
        correctAnswer: 1,
        explanation: 'Rongga mulut merupakan jalur cadangan cepat ketika rongga hidung tersumbat pilek atau ketika aktivitas berat (seperti lari) menuntut asupan udara dalam jumlah besar.',
        hint: 'Lihat nomor 2 pada infografis Jalur Udara.'
      },
      {
        id: 8,
        question: 'Di bagian manakah tempat terjadinya difusi pertukaran gas oksigen (O₂) dan karbon dioksida (CO₂)?',
        options: [
          'Trakea',
          'Alveolus',
          'Faring',
          'Rongga hidung'
        ],
        correctAnswer: 1,
        explanation: 'Alveolus adalah kantung mikroskopis seperti gugusan buah anggur di ujung bronkiolus yang dikelilingi kapiler darah untuk difusi pertukaran gas O₂ dan CO₂.',
        hint: 'Bentuknya bergerombol mirip buah anggur kecil di ujung bronkiolus.'
      },
      {
        id: 9,
        question: 'Urutan jalur aliran udara pernapasan saat dihirup dari luar hingga ke cabang paru-paru adalah...',
        options: [
          'Rongga hidung -> Faring -> Laring -> Trakea -> Bronkus -> Alveolus',
          'Trakea -> Laring -> Faring -> Rongga hidung -> Alveolus',
          'Rongga hidung -> Bronkus -> Diafragma -> Laring -> Faring',
          'Rongga mulut -> Trakea -> Rongga hidung -> Alveolus -> Faring'
        ],
        correctAnswer: 0,
        explanation: 'Urutan yang benar: Rongga hidung/mulut -> Faring -> Laring -> Trakea -> Bronkus -> Bronkiolus -> Alveolus.',
        hint: 'Ikuti urutan nomor 1 sampai 5 pada panel Jalur Udara Pernapasan.'
      },
      {
        id: 10,
        question: 'Otot berbentuk kubah di bawah paru-paru yang menjadi pembatas rongga dada dan perut adalah...',
        options: [
          'Otot Epiglotis',
          'Otot Diafragma',
          'Otot Bisep',
          'Otot Trakea'
        ],
        correctAnswer: 1,
        explanation: 'Diafragma adalah otot pernapasan utama berbentuk kubah yang membatasi rongga dada dan rongga perut.',
        hint: 'Otot ini mendatar saat menarik napas dan melengkung saat membuang napas.'
      }
    ]
  },
  {
    id: 'paket-b',
    title: 'Paket B: Mekanisme Napas & Alveolus',
    badge: 'Fisiologi & Simulasi',
    description: 'Memahami proses inspirasi dan ekspirasi, kerja otot diafragma, perubahan volume dada, dan pertukaran gas di mikroskop alveolus.',
    iconName: 'Activity',
    colorTheme: 'from-emerald-600 to-teal-600',
    questions: [
      {
        id: 11,
        question: 'Bagaimanakah gerakan otot diafragma pada saat fase Inspirasi (menarik napas)?',
        options: [
          'Berkontraksi dan bergerak mendatar ke bawah',
          'Berelaksasi dan melengkung ke atas',
          'Tetap diam tidak mengalami perubahan bentuk',
          'Mengecil dan menutup saluran tenggorokan'
        ],
        correctAnswer: 0,
        explanation: 'Saat menarik napas (inspirasi), otot diafragma berkontraksi sehingga posisinya mendatar ke bawah, memperluas rongga dada ke arah bawah.',
        hint: 'Perhatikan animasi simulasi pernapasan saat tombol "Tarik Napas" aktif.'
      },
      {
        id: 12,
        question: 'Apa yang terjadi pada volume dan tekanan di rongga dada ketika otot pernapasan berkontraksi saat inspirasi?',
        options: [
          'Volume rongga dada membesar, tekanan udara di dalam paru-paru turun di bawah tekanan luar',
          'Volume rongga dada mengecil, tekanan udara di paru-paru naik sangat tinggi',
          'Volume dan tekanan rongga dada tidak berubah sama sekali',
          'Paru-paru mengempis dan membuang semua udara keluar'
        ],
        correctAnswer: 0,
        explanation: 'Saat rongga dada membesar, tekanan di dalam paru-paru menurun menjadi lebih rendah dari udara luar, sehingga udara luar terhisap masuk ke dalam paru-paru.',
        hint: 'Udara selalu mengalir dari area bertekanan tinggi ke area bertekanan rendah.'
      },
      {
        id: 13,
        question: 'Bagaimanakah bentuk otot diafragma saat fase Ekspirasi (menghembuskan napas keluar)?',
        options: [
          'Mendatar lurus ke bawah',
          'Berelaksasi dan kembali melengkung ke atas seperti kubah',
          'Mengencang dan menekan tulang pinggul',
          'Berputar 90 derajat di dalam perut'
        ],
        correctAnswer: 1,
        explanation: 'Saat ekspirasi, otot diafragma berelaksasi (kembali kendur) dan terdorong melengkung ke atas seperti kubah, menekan rongga dada agar mengecil.',
        hint: 'Relaksasi otot mengembalikan diafragma ke posisi awalnya yang melengkung.'
      },
      {
        id: 14,
        question: 'Mengapa udara keluar dari paru-paru saat proses ekspirasi berlangsung?',
        options: [
          'Karena rongga dada menyusut sehingga tekanan udara di paru-paru lebih tinggi daripada udara luar',
          'Karena gaya gravitasi bumi menarik udara ke tanah',
          'Karena jantung berhenti memompa darah',
          'Karena rongga hidung menyedot udara keluar'
        ],
        correctAnswer: 0,
        explanation: 'Rongga dada yang menyusut menekan paru-paru sehingga tekanan udara di dalam paru-paru meningkat lebih tinggi dari tekanan atmosfer dan udara terdorong keluar.',
        hint: 'Bayangkan seperti meremas balon berisi udara, udara akan terdorong keluar.'
      },
      {
        id: 15,
        question: 'Pada mikroskop alveolus, ke manakah arah perpindahan gas Oksigen (O₂) saat terjadi pertukaran gas?',
        options: [
          'Dari aliran darah kapiler masuk ke dalam rongga alveolus',
          'Dari rongga alveolus menembus dinding tipis masuk ke kapiler darah',
          'Dari kerongkongan menuju ke lambung',
          'Dari sel darah putih menuju ke sel tulang'
        ],
        correctAnswer: 1,
        explanation: 'Oksigen berkonsentrasi tinggi di dalam rongga alveolus, sehingga berdifusi melintasi membran tipis masuk ke kapiler darah untuk diikat sel darah merah.',
        hint: 'Perhatikan panah merah gas O₂ pada tampilan Mikroskop Alveolus.'
      },
      {
        id: 16,
        question: 'Ke manakah arah difusi gas Karbon Dioksida (CO₂) di area kapiler alveolus?',
        options: [
          'Dari sel darah merah di kapiler keluar menuju rongga alveolus untuk dihembuskan',
          'Dari rongga alveolus masuk ke dalam otak',
          'Dari rambut hidung masuk ke saluran pencernaan',
          'Dari tulang rusuk menuju ke otot diafragma'
        ],
        correctAnswer: 0,
        explanation: 'Karbon dioksida merupakan zat sisa pembakaran sel yang dibawa darah. Di alveolus, CO₂ berdifusi dari kapiler ke rongga alveolus agar dikeluarkan saat ekspirasi.',
        hint: 'Perhatikan panah biru gas CO₂ yang keluar menuju rongga udara alveolus.'
      },
      {
        id: 17,
        question: 'Bagian darah apakah yang memiliki hemoglobin untuk mengikat oksigen dari paru-paru dan membawanya ke seluruh tubuh?',
        options: [
          'Keping darah (trombosit)',
          'Sel darah merah (eritrosit)',
          'Sel darah putih (leukosit)',
          'Plasma darah bening'
        ],
        correctAnswer: 1,
        explanation: 'Sel darah merah (eritrosit) mengandung protein hemoglobin yang bertugas khusus mengikat oksigen di paru-paru dan mengedarkannya ke setiap sel tubuh.',
        hint: 'Di infografis langkah 4, terlihat sel darah berwarna merah mengalir di pembuluh.'
      },
      {
        id: 18,
        question: 'Mengapa dinding kantung alveolus dan pembuluh kapiler darah tersusun sangat tipis (hanya satu lapis sel)?',
        options: [
          'Agar udara bisa keluar masuk dengan cepat dan mudah melalui proses difusi',
          'Karena tubuh kekurangan zat kalsium untuk menebalkannya',
          'Agar makanan bisa lewat ke paru-paru',
          'Supaya debu kotoran bisa tersimpan di dalamnya'
        ],
        correctAnswer: 0,
        explanation: 'Dinding yang luar biasa tipis (satu lapis sel epitel) meminimalkan jarak difusi, sehingga gas O₂ dan CO₂ dapat bertukar dalam hitungan milidetik.',
        hint: 'Semakin tipis penghalangnya, semakin cepat molekul gas dapat menembusnya.'
      },
      {
        id: 19,
        question: 'Pernapasan yang utamanya mengandalkan gerakan naik-turunnya tulang rusuk oleh otot antartulang rusuk disebut...',
        options: [
          'Pernapasan dada',
          'Pernapasan perut',
          'Pernapasan lambung',
          'Pernapasan telinga'
        ],
        correctAnswer: 0,
        explanation: 'Pernapasan dada digerakkan oleh kontraksi otot antartulang rusuk (interkostal), sedangkan pernapasan perut digerakkan oleh otot diafragma.',
        hint: 'Tulang rusuk berada di bagian dada.'
      },
      {
        id: 20,
        question: 'Apa yang terjadi pada paru-paru saat kita menghirup udara secara maksimal?',
        options: [
          'Paru-paru mengembang membesar karena ratusan juta alveolus terisi udara beroksigen',
          'Paru-paru mengempis menjadi sangat kecil',
          'Paru-paru berpindah posisi ke rongga perut',
          'Paru-paru membeku untuk menghemat energi'
        ],
        correctAnswer: 0,
        explanation: 'Saat udara masuk secara maksimal, jutaan kantung alveolus di dalam paru-paru mengembang elastis menampung volume udara yang kaya akan oksigen.',
        hint: 'Mirip seperti balon karet yang ditiup hingga membesar elastis.'
      }
    ]
  },
  {
    id: 'paket-c',
    title: 'Paket C: Fisiologi & Fakta Sains',
    badge: 'Fakta Sains & Kesehatan',
    description: 'Mengeksplorasi fakta unik seputar kapasitas paru-paru, refleks pernapasan, cegukan, pembersih silia trakea, dan gaya hidup sehat.',
    iconName: 'Sparkles',
    colorTheme: 'from-indigo-600 to-violet-600',
    questions: [
      {
        id: 21,
        question: 'Berapa perkiraan jumlah kantung alveolus mikroskopis yang dimiliki manusia dewasa di dalam kedua paru-parunya?',
        options: [
          'Sekitar 100 sampai 500 buah saja',
          'Sekitar 300 sampai 500 juta kantung alveolus',
          'Tepat 10.000 kantung alveolus',
          'Hanya ada 2 buah (kiri dan kanan)'
        ],
        correctAnswer: 1,
        explanation: 'Di dalam kedua paru-paru manusia dewasa terdapat sekitar 300 hingga 500 juta alveolus yang menyediakan luas permukaan yang sangat besar.',
        hint: 'Periksa kotak Fakta Sains Alveolus di aplikasi.'
      },
      {
        id: 22,
        question: 'Jika seluruh permukaan dinding alveolus manusia dewasa dibentangkan mendatar, luasnya diperkirakan setara dengan...',
        options: [
          'Ukuran satu lembar kertas HVS',
          'Ukuran satu meja belajar kecil',
          'Luas lapangan bulu tangkis (~70 hingga 100 meter persegi)',
          'Luas seluruh benua Asia'
        ],
        correctAnswer: 2,
        explanation: 'Karena jumlahnya mencapai ratusan juta dengan lipatan-lipatan halus, luas permukaan total alveolus mencapai 70-100 m² (setara lapangan bulu tangkis).',
        hint: 'Fakta ini ada di bagian Fakta Menarik Sistem Pernapasan.'
      },
      {
        id: 23,
        question: 'Apakah yang sebenarnya memicu timbulnya peristiwa cegukan (hiccups) pada tubuh kita?',
        options: [
          'Kejang atau kontraksi tiba-tiba yang tak disengaja pada otot diafragma',
          'Kekurangan oksigen di dalam lambung',
          'Rambut hidung yang tumbuh terlalu panjang',
          'Paru-paru kanan tertukar posisi dengan paru-paru kiri'
        ],
        correctAnswer: 0,
        explanation: 'Cegukan terjadi akibat kontraksi atau kejang mendadak dan tak terkendali pada otot diafragma yang menyebabkan pita suara menutup mendadak (bunyi "hik!").',
        hint: 'Lihat fakta kunci pada kartu organ Diafragma.'
      },
      {
        id: 24,
        question: 'Apakah fungsi dari rambut-rambut getar halus (silia) yang melapisi permukaan dinding trakea?',
        options: [
          'Bergetar terus-menerus menyapu debu kotoran dan lendir ke atas keluar dari paru-paru',
          'Mengunyah makanan yang tidak sengaja tertelan',
          'Menghasilkan gas oksigen sendiri di tenggorokan',
          'Menahan udara agar tidak bisa keluar lagi'
        ],
        correctAnswer: 0,
        explanation: 'Silia di trakea bergetar ribuan kali per menit seperti sapu eskalator otomatis, membawa lendir dan kotoran keluar menuju faring untuk dibatukkan atau ditelan aman.',
        hint: 'Disebut sebagai sistem "pembersih otomatis paru-paru" di fakta sains.'
      },
      {
        id: 25,
        question: 'Berapakah frekuensi pernapasan normal rata-rata manusia dewasa saat sedang beristirahat atau santai?',
        options: [
          '1 sampai 3 kali per menit',
          '12 sampai 20 kali tarikan napas per menit',
          '60 sampai 100 kali per menit',
          'Hanya bernapas sekali setiap 1 jam'
        ],
        correctAnswer: 1,
        explanation: 'Saat istirahat normal, orang dewasa bernapas sekitar 12-20 kali per menit, atau setara dengan lebih dari 20.000 kali bernapas setiap harinya.',
        hint: 'Periksa kartu fakta "20.000 Kali Bernapas Setiap Hari".'
      },
      {
        id: 26,
        question: 'Mengapa setelah berlari kencang laju pernapasan kita menjadi jauh lebih cepat dan terengah-engah?',
        options: [
          'Karena sel-sel otot bekerja keras membutuhkan banyak oksigen dan menghasilkan banyak karbon dioksida',
          'Karena paru-paru mengecil saat kita bergerak aktif',
          'Karena udara di sekitar kita tiba-tiba habis',
          'Karena hidung tertutup otomatis saat berlari'
        ],
        correctAnswer: 0,
        explanation: 'Saat berolahraga keras, otot membutuhkan energi besar sehingga membakar lebih banyak oksigen dan menghasilkan banyak karbon dioksida yang harus cepat dibuang.',
        hint: 'Pikirkan kebutuhan energi dan oksigen sel otot saat bergerak giat.'
      },
      {
        id: 27,
        question: 'Paru-paru merupakan satu-satunya organ tubuh manusia yang dapat mengapung di atas air karena...',
        options: [
          'Mengandung banyak minyak pelumas',
          'Mengandung jutaan kantung udara dan selalu menyimpan udara sisa (residu)',
          'Terbuat dari bahan spons gabus buatan',
          'Tidak memiliki berat sama sekali'
        ],
        correctAnswer: 1,
        explanation: 'Paru-paru selalu menyimpan sejumlah udara cadangan di dalam jutaan alveolusnya sehingga memiliki massa jenis lebih ringan dari air dan dapat mengapung.',
        hint: 'Lihat fakta sains "Organ yang Bisa Mengapung".'
      },
      {
        id: 28,
        question: 'Bagaimanakah dampak buruk asap rokok dan polusi udara terhadap saluran pernapasan kita?',
        options: [
          'Membuat paru-paru semakin kuat dan kebal terhadap penyakit',
          'Melumpuhkan silia pembersih, menumpuk racun, dan merusak elastisitas dinding alveolus',
          'Membantu mempercepat pertukaran oksigen di dalam darah',
          'Menambah jumlah lobus pada paru-paru kiri'
        ],
        correctAnswer: 1,
        explanation: 'Zat berbahaya dalam asap rokok dan polusi melumpuhkan rambut silia pembersih trakea, memicu lendir berlebih, serta merusak elastisitas dinding kantung alveolus.',
        hint: 'Asap beracun merusak mekanisme pertahanan alami saluran pernapasan.'
      },
      {
        id: 29,
        question: 'Mengapa bernapas melalui rongga hidung jauh lebih sehat dibandingkan selalu bernapas lewat mulut?',
        options: [
          'Karena rongga mulut tidak bisa menampung udara sama sekali',
          'Karena di hidung udara disaring rambut halus, dihangatkan kapiler, dan dilembapkan selaput lendir',
          'Karena hidung terhubung langsung dengan organ jantung',
          'Karena bernapas lewat hidung tidak memerlukan energi'
        ],
        correctAnswer: 1,
        explanation: 'Rongga hidung adalah filter alami ber-AC biologis: menyaring debu dengan silia, menghangatkan suhu udara via kapiler, dan melembapkannya dengan lendir.',
        hint: 'Ingat 3 fungsi utama rongga hidung pada langkah 1.'
      },
      {
        id: 30,
        question: 'Tindakan nyata manakah yang paling tepat untuk menjaga kesehatan sistem pernapasan kita sehari-hari?',
        options: [
          'Berolahraga di pagi hari dengan udara segar, tidak merokok, dan memakai masker di tempat berdebu',
          'Sering berada di ruangan tertutup yang penuh asap rokok dan knalpot',
          'Menahan napas selama mungkin setiap hari',
          'Hanya bernapas lewat mulut sepanjang waktu'
        ],
        correctAnswer: 0,
        explanation: 'Menjaga ventilasi rumah, berolahraga di udara segar, tidak merokok, dan melindungi diri dengan masker saat udara berdebu adalah cara menjaga kesehatan paru-paru.',
        hint: 'Pilihlah gaya hidup yang menjaga paru-paru tetap bersih dan beroksigen optimal.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = QUIZ_PACKAGES[0].questions;

export const FUN_FACTS = [
  {
    title: '300-500 Juta Alveolus',
    desc: 'Di dalam kedua paru-paru manusia dewasa terdapat sekitar 300 sampai 500 juta kantung alveolus.',
    icon: '🍇'
  },
  {
    title: 'Seluas Lapangan Bulu Tangkis',
    desc: 'Jika seluruh permukaan alveolus dibentangkan mendatar, luasnya mencapai 70 hingga 100 meter persegi!',
    icon: '🏸'
  },
  {
    title: '20.000 Kali Bernapas Setiap Hari',
    desc: 'Secara rata-rata, manusia bernapas sekitar 12-20 kali per menit, atau lebih dari 20.000 tarikan napas setiap hari.',
    icon: '🫁'
  },
  {
    title: 'Pembersih Otomatis Paru-paru',
    desc: 'Silia (rambut halus) di dinding trakea bergetar hingga 1.000 kali per menit untuk menyapu debu dan lendir keluar.',
    icon: '✨'
  },
  {
    title: 'Organ yang Bisa Mengapung',
    desc: 'Paru-paru adalah satu-satunya organ dalam tubuh manusia yang dapat mengapung di atas air karena selalu terisi udara cadangan.',
    icon: '🌊'
  }
];
