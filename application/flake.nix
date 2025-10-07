{
  description = "Development environment for UniRide";
  inputs.utils.url = "github:numtide/flake-utils";
  outputs = { self, nixpkgs, utils }: utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system}; in
    {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [ nodejs pnpm firebase-tools ];
        shellHook = ''
          echo "First time running this? Run \"pnpm install\"."
          echo "Run 'pnpm start' to start the Expo application and firebase emulators."
        '';
      };
    }
  );
}
