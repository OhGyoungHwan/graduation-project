export const onClickLink = (url) => (e) => {
  moveLink(url)
};

export const onClickExternLink = (url) => (e) => {
  moveLink(url)
};

function moveLink(url) {
  window.location.assign(url);
}

export const isNull = (value) => {
  if (value === "" || value === null || value === undefined || (value !== null && typeof value === "object" && !Object.keys(value).length)) {
    return true
  } else {
    return false
  }
};