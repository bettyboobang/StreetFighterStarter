import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const modalBody = createElement({ //creating a container element for the winner's image
        className: 'winner-modal___body' 
    });
    const winnerImage = createElement({//takes the fighter's source, name, and title as attributes to display the winner's image in the modal
        tagName: 'img',
        className: 'winner-modal___img',
        attributes: {
            src: fighter.source,
            alt: fighter.name,
            title: fighter.name
        }
    });
    modalBody.append(winnerImage);//appending the winner's image to the modal body container

    showModal({
        title: `${fighter.name} wins!!`,//setting the title of the modal to announce the winner
        bodyElement: modalBody,
    });
}
