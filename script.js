    const imageContainer = document.createElement("img");
    const contentContainer = document.getElementById("content");


    const fetchRandomImage = () => {
        return fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => data.message);
    }

    const fetchRandomDogImageByBreed = async () => {
        const inputBreed = document.getElementById("input-breed");
        const onError = document.createElement("p");

        const response = await fetch(`https://dog.ceo/api/breed/${inputBreed.value.toLowerCase()}/images/random`)
            .then(res => res.json())
            .then(data => data);

        contentContainer.innerHTML = "";
        if (response.status === "success") {
            imageContainer.src = response.message;
            contentContainer.appendChild(imageContainer)
        } else {
            onError.innerText = "Breed not found!";
            contentContainer.appendChild(onError);
        }
    }


    const fetchSubBreedsFromBreed = async () => {
        const inputBreed = document.getElementById("input-breed");
        const subList = document.createElement("ol");
        const onError = document.createElement("p");

        const response = await fetch(`https://dog.ceo/api/breed/${inputBreed.value.toLowerCase()}/list`)
            .then(res => res.json())
            .then(data => data);

        let listElements = response.message;

        console.log(listElements);

        contentContainer.innerHTML = "";
        if (response.status === "error") {
            onError.innerText = "Breed not found!";
            contentContainer.appendChild(onError);
        } else if (response.message.length === 0){
            onError.innerText = "No sub-breeds found!";
            contentContainer.appendChild(onError);
        } else if (response.status === "success") {
            listElements.forEach((element) => {
                const listElement = document.createElement("li");
                listElement.innerText = element;
                subList.appendChild(listElement);
            })
            contentContainer.appendChild(subList);
        }
    }

    const fetchAllBreedsAndSubBreeds = async () => {
        contentContainer.innerHTML = "";
        const orderedList = document.createElement("ol");

        const response = await fetch(`https://dog.ceo/api/breeds/list/all`)
            .then(res => res.json())
            .then(data => data);

        console.log(response);

        for (const breed of Object.keys(response.message)) {
            const dogBreedList = document.createElement("li");
            dogBreedList.innerText = breed;
            for (const subBreed of response.message[breed]) {
                const dogSubBreedList = document.createElement("ul");
                const dogSubBreedListItem = document.createElement("li");
                dogSubBreedListItem.innerText = subBreed;
                dogSubBreedList.appendChild(dogSubBreedListItem);
                dogBreedList.appendChild(dogSubBreedList);
            }
            orderedList.appendChild(dogBreedList);
            contentContainer.appendChild(orderedList);
        }
    }




    const createRandomDogImage = async () => {
        contentContainer.innerHTML = "";

        imageContainer.src = await fetchRandomImage();
        contentContainer.appendChild(imageContainer);
    }

