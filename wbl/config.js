// ==============================================
// SKR SHOP - Googleフォーム連携 設定ファイル
// （4商品それぞれ別フォーム版）
// ==============================================
//
// 【構成】
// 商品ごとに独立したGoogleフォームを用意し、商品名が
// 事前入力された状態のURLへリンクしています。
//
// 【新しいフォームに差し替える場合】
// FORM_URLS の該当商品のURLを新しいフォームURLに置き換えるだけ。
// （「商品名を事前入力したURL」をApps Script等で生成したものを使用）
// ==============================================

const FORM_URLS = {
  "個性派コスメ":       "https://docs.google.com/forms/d/e/1FAIpQLSenOdwYG9rL7uoUJKg4N0uHSPXDMxCpvfWRoWJPRMLaii9_yA/viewform?usp=pp_url&entry.886206093=%E5%80%8B%E6%80%A7%E6%B4%BE%E3%82%B3%E3%82%B9%E3%83%A1",
  "ミネラルウォーター": "https://docs.google.com/forms/d/e/1FAIpQLSeJQGxHN8ZRebqdSqw6iT2ZBddQQNAq0eCo__dEz1oo5l8lvw/viewform?usp=pp_url&entry.604133323=%E3%83%9F%E3%83%8D%E3%83%A9%E3%83%AB%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%BF%E3%83%BC",
  "プロテイン":         "https://docs.google.com/forms/d/e/1FAIpQLSd6e5IToQ35Xlx2xmHsGZAAGLsRfFGVDQNen9CBsy46xokxgQ/viewform?usp=pp_url&entry.2047610054=%E3%83%97%E3%83%AD%E3%83%86%E3%82%A4%E3%83%B3",
  "キャンプ用薪":       "https://docs.google.com/forms/d/e/1FAIpQLSf3_GV1sW9HqXH-XjjCqlG40JY3EF4BOnDxiHGO-raDThhOpw/viewform?usp=pp_url&entry.658157876=%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%97%E7%94%A8%E8%96%AA"
};


// ==============================================
// 以下は変更不要（サイトが自動で動くための処理）
// ==============================================

/**
 * data-product属性の値から該当フォームURLを取得
 * @param {string} productName - 商品名
 * @returns {string|null} フォームURL
 */
function getFormUrl(productName) {
  return FORM_URLS[productName] || null;
}

/**
 * ページ読み込み後、data-product属性のあるボタンにURLを設定
 */
document.addEventListener('DOMContentLoaded', () => {
  const orderButtons = document.querySelectorAll('[data-product]');
  orderButtons.forEach(btn => {
    const productName = btn.getAttribute('data-product');
    const url = getFormUrl(productName);
    if (url) {
      btn.setAttribute('href', url);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    } else {
      console.warn('⚠️ SKR SHOP: 商品「' + productName + '」のフォームURLが未登録です。config.jsを確認してください。');
    }
  });
});
