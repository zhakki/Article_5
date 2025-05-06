function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
        src="/uploads/4.jpg"
        alt="Kirjutamine"
        className="w-full max-w-md mx-auto h-auto rounded-xl shadow-md mb-6"
      />
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Tere tulemast artiklite lehele!
      </h1>

      <p className="mb-4 text-lg">Siin võib igaüks olla autor.</p>

      <p className="mb-4 text-base md:text-lg">
        Kirjuta artikleid, jaga oma mõtteid, räägi lugusid — tõsiseid või
        kergemaid, isiklikke või ühiskondlikke. Me usume, et igal inimesel on
        midagi öelda ja igaüks väärib ärakuulamist.
      </p>
      

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Loe?</strong> Leia inspiratsiooni, saa teada midagi uut, jäta
          kommentaare ja aita autoritel areneda.
        </li>
        <li>
          <strong>Kirjutad?</strong> Harjuta, kogu tagasisidet, lihvi oma
          stiili — võib-olla on see algus millelegi suurele.
        </li>
        <li>
          <strong>Suhtled?</strong> Ainult lugupidavalt. Me ei ole siin
          vaidlemas, vaid arenemas.
        </li>
      </ul>

      <blockquote className="italic border-l-4 border-gray-400 pl-4 mb-4 text-gray-700">
        See ei ole sotsiaalmeedia. See on ideede platvorm. <br />
        See ei ole lava. See on töötuba.
      </blockquote>

      <p className="mb-4">
        Registreerimine on avatud kõigile, kuid pea meeles: <br />
        <strong>ei mingeid solvanguid, roppusi ega mürgisust.</strong> Me
        suhtleme arukalt ja lugupidavalt.
      </p>

      <p className="text-lg font-medium">
        📚 Liitu — loe, kirjuta, arutle. <br />
        Oleme siin, et õppida, areneda ja jagada.
      </p>
      <img
        src="/uploads/7.jpg"
        alt="Kirjuta"
        className="w-full h-auto rounded-sm shadow-lg mb-6"
      />
    </div>
  );
}

export default HomePage;
