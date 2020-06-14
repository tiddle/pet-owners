// All this stuff I would handle in React, Vue or Angular. Project is too small for them, easier just to do it manually.

/**
 * Displays data in list on page
 *
 * @param {Object} dataObj
 * @param {String} containerId
 * @param {String} iteratorKey
 * @param {String} itemKey
 */
export function displayData(
	dataObj,
	containerId = 'container',
	iteratorKey = 'pets',
	itemKey = 'name'
) {

	document.getElementById(containerId).textContent = '';
	const wrapperDiv = document.createElement('div');

	Object.values(dataObj).forEach((curr) => {
		const heading = document.createElement('h2');
		const headingText = document.createTextNode(curr.sortName);
		heading.appendChild(headingText);
		wrapperDiv.appendChild(heading);

		if (curr[iteratorKey] && curr[iteratorKey].length > 0) {
			const list = document.createElement('ul');
			curr[iteratorKey].forEach((c) => {
				const listItem = document.createElement('li');
				const listItemText = document.createTextNode(c[itemKey]);
				listItem.appendChild(listItemText);
				list.appendChild(listItem);
			});

			wrapperDiv.appendChild(list);
		}

		document.getElementById(containerId).appendChild(wrapperDiv);
	});
}
