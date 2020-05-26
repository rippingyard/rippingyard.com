import { storage } from '~/plugins/firebase'

export default function(file) {
  if (file.size === undefined) return
  const storageRef = storage.ref()
  storageRef
    .child(file.name)
    .put(file)
    .then(snapshot => {
      console.log('Uploaded a file!')
    })
}
