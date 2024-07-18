/** three ways to control dark mode
 *  1. prefers-color-scheme (system)
 *  2. toggle
 *  3. localStorage
 * 
 *  precedence:
 *  localStorage = toggle > prefers-color-scheme
 *  if (localStorage)
 *  then (localStorage)
 *  else (prefers-color-scheme)
 *  
 *  if (toggle)
 *    if (toggle == prefers-color-scheme)
 *    then (delete localStorage)
 *  else (set localStorage)
 * 
 *  localStorage > prefers-color-scheme
 *  toggle SET or DELETE localStorage
 * 
 *  determine color mode WHEN:
 *  1. load page
 *  2. change prefers-color-scheme
 *  3. toggle
 */
const USER_SET_COLOR_SCHEME = 'USER_SET_COLOR_SCHEME'
const lightToggle = document.querySelector('#light')
const darkToggle = document.querySelector('#dark')
const body = document.querySelector('body')


//* 1. on load
function setColorSchemeBasedOnLocalStorageOrSystemPreference() {
  // check localStorage set scheme based on that
  const preferdColorScheme = localStorage.getItem(USER_SET_COLOR_SCHEME)
  if (preferdColorScheme === 'light') {
    setLightScheme()
  } else if (preferdColorScheme === 'dark') {
    setDarkScheme()
  }
  // use system preference in case there isn't localStorage
}
setColorSchemeBasedOnLocalStorageOrSystemPreference()

//* 2. listen on system preference changing
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (!localStorage.getItem(USER_SET_COLOR_SCHEME)) {
    const preferdColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.querySelector(`#${preferdColorScheme}`).checked = true
  }
})

//* 3. toggle
const radios = document.querySelectorAll('.toggle__radio')
radios.forEach(radio => {
  radio.addEventListener('click', e => {
    // get current system preference
    const preferdColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const toggledToColorScheme = e.target.id
    console.log(preferdColorScheme)
    console.log(toggledToColorScheme)
    // if the same, delete localStorage
    if (preferdColorScheme === toggledToColorScheme) {
      localStorage.removeItem(USER_SET_COLOR_SCHEME)
      restoreToSystemPreferedColorScheme()
    } else {
      // set localStorage
      localStorage.setItem(USER_SET_COLOR_SCHEME, toggledToColorScheme)
      setUserPreferdColorScheme(toggledToColorScheme)
    }
  })
});

function setLightScheme() {
  body.classList = 'light'
  lightToggle.checked = true
}

function setDarkScheme() {
  body.classList = 'dark'
  darkToggle.checked = true
}

function refreshPage() {
  location.reload()
}

function restoreToSystemPreferedColorScheme() {
  body.classList = ''
  const preferdColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.querySelector(`#${preferdColorScheme}`).checked = true
}

function setUserPreferdColorScheme(scheme) {
  if (scheme === 'light') setLightScheme()
  else setDarkScheme()
}

