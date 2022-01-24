module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    env: {
      infuraURL: "", // insert infura endpoint
      contractAddress: "", //insert contract address
      mnemonicPhrase: "", //insert your account mnemonic
    },
  };
  return nextConfig;
};
