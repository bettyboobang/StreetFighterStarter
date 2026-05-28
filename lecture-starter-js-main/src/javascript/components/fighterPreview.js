import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    console.log('3. Превю отримало бійця:', fighter);
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    if (!fighter) {//if the fighter data is not available (e.g., null or undefined), we return an empty fighter preview element without any content.
        return fighterElement;
    }

    const imageElement = createFighterImage(fighter);//creating an image element for the fighter using the createFighterImage function, which takes the fighter data as input and returns an img element with the appropriate attributes based on the fighter's information.
    fighterElement.appendChild(imageElement);
    const infoElement = createElement({//creating a container element for the fighter's information (name and stats) using the createElement helper function.
        tagName: 'div',
        className: 'fighter-preview___info'
    });
    const nameElement = createElement({//creating an element for the fighter's name using the createElement helper function.
        className: 'fighter-preview___name'
    });
    nameElement.innerText = fighter.name;
    infoElement.appendChild(nameElement);
    
    const stats = ['health', 'attack', 'defense'];//defining an array of stats that we want to display for the fighter.
    stats.forEach(stat => {
        const statElement = createElement({
            tagName: 'div',
            className: `fighter-preview___stat`
        });
        const capitalizedStat = stat.charAt(0).toUpperCase() + stat.slice(1);//capitalizing the first letter of the stat name for better presentation in the UI. 
        statElement.innerText = `${capitalizedStat}: ${fighter[stat]}`;
        infoElement.appendChild(statElement);
    });
    fighterElement.appendChild(infoElement);//appending the info element, which contains the fighter's name and stats, to the main fighter preview element.

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}