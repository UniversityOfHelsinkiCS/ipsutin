import { inDevelopment } from '../../config'

const getInitialMessage = () => {
  if (inDevelopment) {
    return {
      inventiveMessageDynamic: `
      Problem Solved:
      The Cat-dog hybrid resolves the dilemma faced by pet lovers torn between the loyalty and activeness of dogs and the low maintenance of cats. Existing breeds often fail to fully satisfy these desires, with dogs requiring frequent walks and training, and cats sometimes lacking in sociability. This innovation fills a gap in the market for a pet that combines the best traits of both species.
  
      The Invention:
      The Cat-dog hybrid is a breakthrough achieved through advanced genetic engineering and biotechnology. By merging genetic traits from both cats and dogs, this hybrid species embodies the loyalty and playfulness of dogs while inheriting the independence and low-maintenance aspects of cats. Cutting-edge gene editing techniques, including CRISPR-Cas9, are utilized to precisely incorporate desired traits while ensuring the health and welfare of the resulting hybrids. Strict ethical guidelines are adhered to throughout the development process to ensure responsible creation and treatment of these animals.
  
      Applications:
  
          Pet Industry: The Cat-dog hybrid presents an unprecedented offering in the pet market, appealing to a wide range of consumers seeking a unique and versatile companion. Demand for these hybrids is expected to soar, creating opportunities for breeders, pet stores, and related businesses.
  
          Show Animal Industry: With their distinctive characteristics and captivating charm, Cat-dog hybrids would be highly sought-after in animal shows and competitions. Their blend of traits would captivate audiences and judges alike, leading to increased interest and participation in such events.
  
          Search-and-Rescue Missions: The agility, trainability, and intelligence of Cat-dog hybrids make them well-suited for search-and-rescue operations. Their unique blend of feline agility and canine obedience enables them to navigate various environments and situations effectively, enhancing the success rate of missions and saving lives.
  
          Therapy Animals: Cat-dog hybrids possess the friendly demeanor and comforting presence ideal for therapy animal roles. Their ability to provide companionship and emotional support makes them invaluable assets in settings such as hospitals, nursing homes, and schools, where they can positively impact the well-being of individuals facing challenges or adversity.
  
      In summary, the Cat-dog hybrid represents a groundbreaking innovation that addresses a specific market need, achieved through cutting-edge genetic technology. Its unique blend of traits holds promise across various industries and applications, from pet ownership to professional services, offering unprecedented opportunities for companionship, performance, and support.
      `,
      publicityMessageDynamic: `The idea of the Cat-dog hybrid has not been publicly disclosed through any publications, presentations, or previous patents. It represents an original concept that has not been shared or disseminated in any form prior to this discussion. Therefore, there are no existing disclosures regarding the invention, its technology, or its potential applications.`,
      industrialMessageDynamic: `The Cat-dog hybrid offers a range of practical applications in industrial settings:

      Pet Industry: It revolutionizes the pet industry by offering a unique blend of dog loyalty and cat independence, appealing to a wide range of consumers seeking a companion with the best traits of both species.
  
      Security and Surveillance: Trained Cat-dog hybrids can patrol industrial facilities, warehouses, and construction sites with agility and keen senses, effectively detecting intruders or potential hazards and enhancing overall security measures.
  
      Search and Rescue Operations: In industries such as mining, forestry, or disaster response, Cat-dog hybrids excel in search and rescue missions. Their agility, scent-tracking abilities, and nimbleness enable them to access hard-to-reach areas and locate missing persons or survivors efficiently, contributing to faster response times and increased likelihood of successful outcomes.
  
      Maintenance and Inspection: Cat-dog hybrids are well-suited for assisting in routine maintenance and inspection tasks in industrial facilities. With their agility and curiosity, they can navigate complex environments, inspect hard-to-reach areas, and identify potential issues or defects, thereby reducing the need for human workers to perform risky or physically demanding tasks.
  
      Therapeutic Support: In high-stress industrial environments such as healthcare or manufacturing, Cat-dog hybrids can serve as therapy animals, providing emotional support to workers and contributing to improved morale and well-being. Their friendly demeanor and calming influence help create a positive work environment and foster a sense of camaraderie among employees.
  
  These practical applications of Cat-dog hybrids offer numerous benefits, including enhanced security, efficiency, and employee well-being, making them valuable assets in various industrial sectors.`,
    }
  }
  return {
    inventiveMessageDynamic: '',
    publicityMessageDynamic: '',
    industrialMessageDynamic: '',
  }
}

export default getInitialMessage
