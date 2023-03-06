class FontResult extends HTMLElement {
  constructor() {
    super();
    this.rtlLanguages = [
      "adlam",
      "arabic",
      "hebrew",
      "imperial-aramaic",
      "inscriptional-pahlavi",
      "inscriptional-parthian",
      "manichaean",
      "nko",
      "old-south-arabian",
      "old-north-arabian",
      "palmyrene",
      "phoenician",
      "psalter-pahlavi",
      "samaritan",
      "sogdian",
      "syriac",
      "thaana",
    ];
    this.languages = {
      adlam: "𞤸𞤫𞤬𞤼𞤭𞤲𞤺𞤮𞤤 𞤸𞤮𞤪𞤥𞤢",
      ahom: "𑜆𑜤𑜪 𑜅𑜩𑜤𑜪𑜬𑜩𑜤",
      "anatolian-hieroglyphs": "𔒄𔒽𔓀𔓂𔓊 𔒎𔓇𔓋𔓊",
      arabic: "مرحبا بالعالم",
      armenian: "բարեւ աշխարհ",
      avestan: "𐬀𐬭𐬀𐬌𐬨𐬌𐬌𐬀 𐬀𐬵𐬰𐬀",
      balinese: "ᬩᬮᬶᬢᬃ ᬩᬮᬢᬶᬢᬃ",
      bamum: "ꛃꔒꔫꕩ ꕞꕌꕊꔤ",
      "bassa-vah": "𖫵𖫞𖫩𖫤𖫦 𖫬𖫚𖫦",
      batak: "ᯂᯃᯁᯔᯑ ᯂᯃᯁᯔᯑ",
      bengali: "হ্যালো ওয়ার্ল্ড",
      bhaiksuki: "𑰤𑰱𑰺𑰰𑰺𑰕𑰳𑰰 𑰤𑰸𑰮𑰺𑰰𑰸𑰕𑰳𑰰",
      brahmi: "𑀩𑁂𑀢𑁆 𑀧𑀼𑀦𑁂𑀢𑁆",
      buginese: "ᨅᨚᨈᨑᨗ ᨅᨚᨈᨑᨗ",
      buhid: "ᝊᝓᝑᝒ ᝊᝓᝑᝒ",
      "canadian-aboriginal": "ᐊᐃ ᐊᓇᑦᓯᐊ",
      carian: "𐊕𐋏𐋉𐊀𐋀𐊎𐊕 𐊑𐋆𐋀𐊎𐊀𐋀𐊎𐊕",
      "caucasian-albanian": "𐕗𐕘𐕙𐔷𐔸𐔹𐔺",
      chakma: "ᨀᨚᨁᨗ ᨆᨗᨕᨙᨁ",
      cham: "សួស្តី​ជន​ជាតិ",
      cherokee: "ᎣᏏᏲ ᎠᏓᏅᏖᏂ",
      "chinese-hongkong": "你好，世界",
      "chinese-simplified": "你好，世界",
      "chinese-traditional": "你好，世界",
      coptic: "Ϩⲁⲛⲧⲉⲣⲟⲩ",
      cuneiform: "𒀭𒈾𒆠𒋢𒉌𒇷",
      cypriot: "𐠀𐠊𐠜𐠔𐠖",
      cyrillic: "Привет, мир",
      "cyrillic-ext": "Привет, мир",
      deseret: "𐐈𐐣𐐆𐐤𐐀 𐐓𐐲𐑌𐐻",
      devanagari: "नमस्ते दुनिया",
      dogra: "𑠉𑠖𑠝𑠥𑠭𑠌𑠡 𑠊𑠕𑠥𑠝𑠦",
      duployan: "⠠⠓⠑⠏⠕⠀⠠⠺⠕⠗⠊⠇⠽",
      "egyptian-hieroglyphs": "𓇋𓏏𓎡𓎼𓎼𓂋𓏏𓊪",
      elbasan: "𑣁𑣋𑣉𑣙𑣉𑣌𑣝𑣉",
      elymaic: "𐩠𐩵𐩥𐩣𐩵𐩧𐩲𐩵",
      emoji: "👋🌍",
      ethiopic: "ሰላም ዓለም",
      georgian: "გამარჯობა მსოფლიო",
      glagolitic: "ⰲⱁⰿⰵⱄⰿⰵⰳⱆⰹⰰ ⰱⱄⰻⱁⰰⱀ",
      gothic: " 𐌲𐌰𐌷𐌰𐌽𐍉 𐍅𐌰𐌹𐍂𐌸𐌰𐌽𐌳",
      grantha: "வணக்கம் உலகமே",
      greek: "Γειά σου Κόσμε",
      "greek-ext": "",
      gujarati: "હલો વર્લ્ડ",
      "gunjala-gondi": "𑵬𑵳𑶗𑶈 𑶀𑵶𑵳𑶋",
      gurmukhi: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦੁਨਿਆਂ ਨੂੰ",
      "hanifi-rohingya": "سلام عليکم دنيا ",
      hanunoo: "ᜀᜃᜋ᜔ ᜆ᜔ᜎᜓᜄ᜔",
      hatran: "𐣴𐣣𐣴𐣭𐣩𐣠 𐣫𐣪𐣫𐣤",
      hebrew: "שָׁלוֹם עוֹלָם ",
      "imperial-aramaic": "ܫܠܳܡܐ ܥܳܠܳܡܐ ",
      "indic-siyaq-numbers": "𑆮𑇈𑇀 𑆥𑇋𑇌𑇄𑇌 ",
      "inscriptional-pahlavi": "𐭪𐭥𐭩𐭪𐭠𐭥 𐭯𐭫𐭥𐭲𐭩𐭥𐭩𐭪 ",
      "inscriptional-parthian": "𐭫𐭥𐭩𐭪𐭠𐭥 𐭯𐭫𐭥𐭲𐭩𐭥𐭩𐭪 ",
      japanese: "こんにちは世界 ",
      javanese: "꧋ꦩꦤꦶꦩ꧀ꦧꦁꦩꦤꦮꦲꦏ꧀ꦲ",
      kaithi: "नमस्कार संसार ",
      kannada: "ಹಲೋ ವರ್ಲ್ಡ್ ",
      "kayah-li": "ʔɔŋ˦ ʔɑ˧˥ ",
      kharoshthi: "𐨁𐨪𐨆𐨯𐨀 𐨑𐨀𐨯𐨿𐨯𐨀 ",
      khmer: "សួស្តី​ពិភពលោក ",
      khojki: "નમસ્કાર સાંસાર ",
      khudawadi: "𑋘𑋍𑋪𑋙 𑋂𑊼𑋍𑋡",
      korean: " 안녕하세요 ",
      lao: " ສະ​ບາຍ​ດີ ",
      latin: " Salve mundi",
      "latin-ext": " Salvē mundi",
      lepcha: " ᰖᰵᰐᰴᰍᰆ ",
      limbu: " ᤕᤠᤰᤌᤢᤱᤠ᤿ ",
      "linear-a": "𐘀𐘁𐘂𐘃𐘄𐘅𐘆",
      "linear-b": "𐀴𐀪𐀡𐀆𐄀𐁁𐀐𐀄",
      lisu: " ꓡꓲ​ꓢꓴ​ꓡꓱ​ꓟ ",
      lycian: "𐊁𐊂𐊚𐊑𐊏𐊚",
      lydian: "𐤱𐤶𐤫𐤳𐤷𐤦𐤱𐤦𐤣 𐤱𐤠𐤨𐤪𐤷 ",
      mahajani: "𑅛𑅣𑅭 𑅛𑅗𑅣𑅑",
      malayalam: " ഹലോ വേൾഡ് ",
      mandaic: " ܫܪܝܪܐ ܐܠܐ ",
      manichaean: "𐫁𐫀𐫏𐫞𐫡𐫀 𐫢𐫡𐫢𐫗𐫏𐫀",
      marchen: "𑲉𑱺𑲪 𑱸𑱴𑱺𑲱 ",
      "masaram-gondi": " ꤰꤼꤰꤻ ꤱ꤯ꤲꤳ ",
      math: "∑∫xy²dx",
      "mayan-numerals": "𒐕𒑭𒅀",
      medefaidrin: "𐏐𐏒𐏓𐏔𐏕𐏖𐏗",
      "meetei-mayek": "ꯃꯤꯇꯩ ꯃꯌꯦꯛ",
      "mende-kikakui": "𞠀𞠡𞠢𞠣𞠤",
      meroitic: "𐦠𐦪𐦫𐦴𐦷",
      miao: "ꠠꠣꠢꠤ",
      modi: "𑘀𑘁𑘂𑘃𑘄𑘅",
      mongolian: "ᠬᠣᠲᠠ",
      mro: "𖩂𖩒𖩀𖩓𖩒",
      multani: "𑚠𑚡𑚢𑚣𑚤𑚥",
      music: "𝄞𝄢𝄡𝄪",
      myanmar: "မင်္ဂလာပါ",
      nabataean: "𐢀𐢊𐢋𐢌𐢍𐢎𐢏",
      "new-tai-lue": "ᦀᦃᦑᦵ",
      newa: "नेपाःला गेःगेः",
      nko: "ߛߊ߲߬ߓߊ߲߫ ߞߏ߫",
      nushu: "𖨸𖩊𖩈𖨸𖩊𖩈",
      "nyiakeng-puachue-hmong": "𞄔𞄄𞄧𞄤𞄃𞄧𞄴𞄅𞄫𞄵𞄘𞄧𞄵𞄉𞄨𞄴",
      ogham: "ᚑᚌᚐᚋᚐᚅ ᚋᚐᚏᚓᚂᚐ",
      "ol-chiki": "᱆ᱟᱨᱤᱯ ᱠᱚᱨᱚ",
      "old-hungarian": "𐳆𐳯𐳶𐳴𐳤𐳏𐳦𐳒 𐳑𐳦𐳔𐳕",
      "old-italic": "𐌀𐌋𐌄𐌓𐌖 𐌿𐌸𐌰𐌽𐌳",
      "old-north-arabian": "𐩢𐩫𐩥𐩩𐩦 𐩯𐩬𐩵𐩣𐩡𐩩",
      "old-permic": "𐍂𐍄𐍉𐍆𐍄𐍃𐍉𐍃 𐍂𐍉𐍄𐍀𐍃",
      "old-persian": "𐎴𐎼𐎫𐎡𐎹𐎠 𐏐𐎢𐎠𐎴𐎡",
      "old-sogdian": "𐼙𐼘𐼙𐼎𐼊𐼁 𐼌𐼋𐼌𐼅 𐼆𐼌𐼍𐼁",
      "old-south-arabian": "𐩮𐩲𐩢𐩯𐩦𐩬𐩶𐩡 𐩼𐩵𐩶𐩷𐩲",
      "old-turkic": "𐰃𐰠𐰴𐰍𐰣𐰆𐰼 𐰢𐰆𐰇𐰚",
      oriya: "ନମସ୍କାର",
      osage: "𐒻𐓲𐓣𐓤𐓪 𐓰𐓘͘𐓤𐓘",
      osmanya: "𐒖𐒘𐒖𐒜𐒖𐒆 𐒘𐒆𐒔𐒖𐒆",
      "pahawh-hmong": "ꓔꕿꔻꘂꘈꘈꕆꕪ",
      palmyrene: "𐡑𐡄𐡀",
      "pau-cin-hau": "ꤍꤢꤪ ꤜꤟꤢ꤬",
      "phags-pa": "ཧེལསི ཝོནད",
      phoenician: "𐤉𐤄𐤅𐤄𐤔𐤍 𐤇𐤃𐤔𐤕",
      "psalter-pahlavi": "𐭪𐭫𐭩𐭥𐭠𐭭𐭥𐭩 𐭲𐭥𐭠𐭥𐭮",
      rejang: "ᨑᨚᨈᨙᨗ ᨂᨗᨒᨚᨀ",
      runic: "ᚺᛖᛚᛟ ᚹᛟᚱᛚᛞ",
      samaritan: "ࠀࠁࠄࠅࠆࠇࠈ ࠆࠌࠌࠌࠌࠌ",
      saurashtra: "ꢬꣃꢶ꣄ ꣄ꢀꣂꢴ꣄",
      sharada: "𑆩𑇉𑇕 𑇌𑇳𑇜𑇳𑇛",
      shavian: "𐑤𐑦𐑚𐑩𐑤𐑦 𐑟𐑨𐑤𐑛",
      siddham: "𑖃𑖂𑖆𑖘𑖖𑖅 𑖁𑖆𑖛𑖖𑖄",
      signwriting: "𝧿𝨊𝡝𝪜𝦦𝪬𝡝𝪩𝡝𝪡𝤅",
      sinhala: "හෙලෝ වර්ල්ඩ්",
      sogdian: "𐼃𐼳𐼰𐼴𐼰𐼵 𐼴𐼷𐼰𐼽𐼲𐼹",
      "sora-sompeng": "𑃐𑃕𑃑𑃕𑃄 𑃞𑃓𑃘𑃕𑃣",
      soyombo: "ᠰᠣᠶᠠᠨ ᠪᠠᠷᠠᠭᠠᠨ",
      sundanese: "᮲ᮨᮚᮞᮤᮘᮥ ᮃᮛᮔ᮪",
      "syloti-nagri": "হেলো ওল্ড",
      symbols: "Hello World",
      syriac: "ܗܠܘ ܡܪܝܐ",
      tagalog: "Kumusta mundo",
      tagbanwa: "ᜀᜃᜎᜓᜅ᜔ ᜆᜓᜎᜓ",
      "tai-le": "ᦑᦲᧃᦏᧈ ᦲᧉᦏᧄ",
      "tai-tham": "ᨴᩱ᩠ᨿᨵᩢ᩠ᨶᩢ᩠ᨾᩯ",
      "tai-viet": "Xin chào thế giới",
      takri: "ਹੈਲੋ ਵਰਲਡ",
      tamil: "ஹலோ வேர்ல்ட்",
      "tamil-supplement": "ஹலோ உலகம்",
      tangsa: "Hello World",
      tangut: "𗼎𗨀𗼇𗽼𗼏 𗼑𗼭𗼑𗽜",
      telugu: "హలో వరల్డ్",
      thaana: "ހައްދަ ދިވެހިބަސް",
      thai: "สวัสดีชาวโลก",
      tibetan: "ཀློག་པོ་གཉིས་པོ།",
      tifinagh: "ⴰⵣⴰⵍⵉⵢⴰⵏ ⵏ ⵍⵏⵉⵔ",
      tirhuta: "𑒨𑒞𑓂𑒩 𑒖𑒑𑒞𑒱",
      toto: "𑗏𑌂𑌇𑌱𑌚𑌿 𑌆𑌰𑍋𑌹𑌾",
      ugaritic: "𐎅𐎍𐎛𐎚𐎄𐎍𐎚𐎍𐎛𐎌𐎍",
      vai: " ꕯꕮꔫꕩ ꖨꕮꕊꔫꘂ",
      vietnamese: "Xin chào thế giới",
      wancho: "𑣁𑣂𑣁𑣋𑣌𑣌𑣌𑣎 𑣂𑣈𑣁𑣋𑣌𑣌𑣌",
      "warang-citi": "ꦲꦫꦶꦱ꧀ꦩꦸꦭꦺꦴꦤ꧀",
      yezidi: "سلام جهان",
      yi: "זשיאָן האַלאָ",
      "zanabazar-square": "ᠵᠠᠨᠠᠪᠠᠵᠠᠷᠠ ᠰᠢᠮᠠᠭᠤᠷᠠ",
    };
  }
  connectedCallback() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("family");
    this.slug = this.getAttribute("slug");
    this.family = this.getAttribute("family");
    this.category = this.getAttribute("category");
    this.variants = this.getAttribute("variants").split(",");
    this.subsets = this.getAttribute("subsets").split(",");
    this.lineNumber = this.getAttribute("lineNumber");

    // get tags json parse
    this.tags = this.getAttribute("tags")
      .split(",")
      .filter((tag) => tag);

    const { slug, family, category, variants, subsets, lineNumber, tags } =
      this;

    const previewName = this.subsetFamily();

    // Add Google Font to document head
    const googleFont = document.createElement("link");
    googleFont.href = `https://fonts.googleapis.com/css2?family=${this.fontCall(
      previewName
    )}`;
    googleFont.rel = "stylesheet";
    googleFont.setAttribute("data-family", family);
    document.head.appendChild(googleFont);

    wrapper.innerHTML = `<div id="family-${slug}">
    <div class="family-link">
      <div id="family-name" class="family-title" style="${this.familyStyle(
        previewName
      )}">
        ${previewName}
      </div>
      <div class="family-meta-container">
     <span class="family-title-small">${
       previewName == family ? "" : family
     }</span>
      <div class="family-meta">
        <span>${category}</span>
        &bull;
        <span aria-label="${variants.join(", ")}"
          >${variants.length} variants</span
        >
        &bull;
        <span aria-label="${subsets.join(", ")}">${
      subsets.length
    } subsets</span>
      </div>
      </div>
    </div>
    <div class="family-tags">
      <div class="family-tags-container">${tags
        .map((tag) => `<tag-button value="${tag}">${tag}</tag-button>`)
        .join("")}</div>
      <div class="family-meta-links">
        <a
          href="https://github.com/katydecorah/font-library/blob/gh-pages/families.json#L${lineNumber}"
          target="_blank"
          aria-label="Edit tags for ${family}"
          >Edit tags</a
        >
           <a
          href="https://fonts.google.com/specimen/${slug}"
          target="_blank"
          aria-label="Visit ${family} on Google Fonts"
          >Google Fonts &rarr;</a
        >
      </div>
    </div>
  </div>`;
    this.appendChild(wrapper);
  }

  // Refactor this function
  fontCall(familyName) {
    const { variants, subsets, slug } = this;
    //get font name
    let font = slug;

    // get selectedVariants
    const selectedVariant = document.querySelector("#select-variants").value;

    if (selectedVariant && selectedVariant !== "regular") {
      const variants = [];
      const hasItalic = selectedVariant.includes("italic");
      if (hasItalic) {
        variants.push("ital");
      }
      // get number form selectedVariant
      const variantNumber = selectedVariant.match(/\d+/g);
      if (variantNumber && variantNumber[0]) {
        variants.push(`wght@${hasItalic ? "1," : ""}${variantNumber[0]}`);
      }
      if (selectedVariant === "italic") {
        variants.push(`wght@1,400`);
      }
      font += `:${variants.join(",")}`;
    } else {
      // if no regular variant
      if (!variants.includes("regular") && variants.includes("italic")) {
        font += `:wght@${variants[0]}`;
      }

      // if no regular or italic?
      if (!variants.includes("regular") && !variants.includes("italic")) {
        font += `:wght@${variants[0]}`;
      }
    }

    // otherwise get this text for the font
    font += `&text=${encodeURIComponent(familyName)}`;

    for (const key in this.languages) {
      if (subsets.indexOf("latin") < 0) {
        font += encodeURIComponent(this.languages[key]);
      }
    }

    font += `&display=swap`;

    return font;
  }

  familyStyle(familyName) {
    let style = `font-family: '${this.family}';`;
    if (
      this.subsets.filter((f) => this.rtlLanguages.includes(f)).length > 0 &&
      this.family !== familyName
    ) {
      style += "direction: rtl;";
    }
    // add italic style
    const selectedVariant = document.querySelector("#select-variants").value;
    if (selectedVariant.includes("italic")) {
      style += "font-style: italic;";
    }

    return style;
  }

  subsetFamily() {
    const { subsets, family } = this;
    const selectedSubset = document.querySelector("#select-subsets").value;

    if (
      (!subsets.includes("latin") || family.startsWith("Noto")) &&
      (this.languages[selectedSubset] || this.languages[subsets[0]])
    ) {
      return this.languages[selectedSubset] || this.languages[subsets[0]];
    }
    if (!subsets.includes("latin") && !this.languages[subsets]) {
      return "";
    }
    return family;
  }
}

customElements.define("font-result", FontResult);
