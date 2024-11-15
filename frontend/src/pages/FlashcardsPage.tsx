import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Card from "../components/FlashcardsPage/Card";
import TextInputSection from "../components/TextInputSection";

function FlashcardsPage() {
  return (
    <div>
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={true}
        isSectionTitleOnly={false}
        sectionTitle="Deck Name"
      />
      <TextInputSection />
      <div className="px-20">
        <div className="pb-20 text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
          Cards
        </div>
        <div className="space-y-5">
          <Card
            cardFront="card1"
            cardBack="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac nibh cursus, venenatis sapien ac, fermentum lorem. Ut sollicitudin at quam vitae viverra. Suspendisse quis blandit mi, id facilisis dolor. Nam condimentum fermentum urna, ut consectetur mauris tincidunt sit amet. Cras gravida vitae ex a dignissim. Nam cursus aliquam odio id fringilla. Maecenas tincidunt dolor est, vitae dignissim leo rhoncus eu. Vivamus ac nibh risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In convallis velit in quam pellentesque faucibus."
          />
          <Card
            cardFront="card2"
            cardBack="Aenean vel aliquet dui. Maecenas luctus libero ex, at elementum nibh varius vel. Curabitur eu suscipit ex. Nulla fringilla congue ligula, id posuere sem tempor id. Morbi laoreet tempus risus non rhoncus. Mauris est diam, posuere non ipsum et, vehicula tristique lorem. Ut fringilla, turpis vitae elementum volutpat, ex magna laoreet nulla, vitae convallis nibh velit quis orci."
          />
          <Card
            cardFront="card3"
            cardBack="Cras vitae pulvinar lacus. Duis interdum risus sem, et aliquam nunc mollis vitae. Cras ac sodales tortor, non vestibulum purus. Nullam elementum volutpat ex sit amet euismod. Aenean quis est varius, venenatis sem vel, rutrum lectus. Sed scelerisque sed leo vitae laoreet. Nulla venenatis, purus nec porta dignissim, ante justo pellentesque justo, in ornare dolor dui non est. Morbi ultrices in tortor nec pellentesque. Aenean velit lectus, tempor accumsan nisl vitae, sollicitudin mollis leo. Nam semper tellus scelerisque quam convallis, eget placerat lectus fermentum. Vestibulum tincidunt diam molestie magna viverra tempor. Fusce vitae dolor id ipsum pharetra rhoncus."
          />
          <Card
            cardFront="card4"
            cardBack="Donec suscipit accumsan viverra. Vestibulum in venenatis massa. Curabitur lacinia nec ligula vel lacinia. Vivamus ut efficitur dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi ut metus in tortor maximus ornare eget in neque. Morbi sit amet est in enim viverra semper. Morbi sit amet lacinia dolor. Maecenas eu leo arcu. Etiam odio purus, dignissim eu leo et, mollis accumsan urna. Sed eget pulvinar metus. Quisque porta risus in nulla maximus, lobortis sodales tortor dictum. Proin accumsan velit vel accumsan luctus."
          />
          <Card
            cardFront="card5"
            cardBack="Aliquam erat volutpat. Proin ut metus lacus. Quisque fringilla tempor sapien. Vestibulum vel ornare erat, nec faucibus velit. Nullam quam enim, venenatis molestie quam et, aliquam sollicitudin quam. Nam vel pretium massa. Duis maximus, urna ut rutrum efficitur, ligula neque gravida tortor, sit amet hendrerit urna felis dictum massa. Praesent quis convallis nisi. Sed sagittis, ligula id aliquet blandit, mi neque volutpat metus, quis efficitur augue mauris vel lacus. Morbi eget metus quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
          />
        </div>
      </div>
    </div>
  );
}

export default FlashcardsPage;
