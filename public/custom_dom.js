/**
 * Swagger custom dom for Swagger UI
 * @author TheRolf
 */

const GITHUB_URL = 'https://github.com/Faithful-Resource-Pack/API';

(() => {
	// eslint-disable-next-line no-undef
	const doc = document;

	doc.addEventListener('DOMContentLoaded', () => {
		// Add custom footer
		const { body } = doc;
		body.innerHTML += `<a href="${GITHUB_URL}" target="_blank"\
			style="position: absolute; top: 0; right: 0;">\
			<img decoding="async" loading="lazy" width="149" height="149"\
				src="https://github.blog/wp-content/uploads/2008/12/forkme_right_green_007200.png"\
				alt="Fork me on GitHub" data-recalc-dims="1" />\
		</a>`;
	});
})();
