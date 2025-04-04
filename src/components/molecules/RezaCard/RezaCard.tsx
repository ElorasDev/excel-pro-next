const RezaCard = () => {
    return (
      <div 
        className="md:w-1/4 h-full rounded-lg shadow-xl relative overflow-hidden my-6 lg:my-0 md:my-0 sm:my-6"
        style={{
          backgroundImage: `url(/images/person/reza-abedian.png)`,
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '360px',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 opacity-90 rounded-lg" 
            style={{
              background: "#FFFFFF",
              border: "1px solid #CCCCCC",
              backdropFilter: "blur(8px)"
            }}>
          <h2 className="text-lg md:text-xl font-bold text-center text-gray-900">Reza Abedian</h2>
          <p className="text-sm md:text-base text-gray-600 text-center">Owner of Excel Pro Academy</p>
        </div>
      </div>
    );
};

export default RezaCard;