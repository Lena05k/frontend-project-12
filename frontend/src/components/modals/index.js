import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};
console.log('modals:', modals.adding);
const getModal = (modalName) => modals[modalName];
export default getModal;
