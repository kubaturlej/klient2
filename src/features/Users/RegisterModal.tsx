import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


const RegisterModal = () => {
    const { modalStore } = useStore();
    return (
       <Modal closeOnDimmerClick size='small' open={modalStore.isOpen} onClose={modalStore.closeModal}>
            <Modal.Content>
                {modalStore.content}
            </Modal.Content>
       </Modal>
    )
}

export default observer(RegisterModal);