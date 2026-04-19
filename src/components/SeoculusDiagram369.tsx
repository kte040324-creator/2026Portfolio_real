import { seoculusAsset } from '../lib/seoculusAssets';

const d = (hash: string) => seoculusAsset(`img/diagram/${hash}.svg`);

type PinProps = { inset: string; nodeId: string; hash: string; inner?: 'x' | 'y' };

function D369Pin({ inset, nodeId, hash, inner }: PinProps) {
  const img = <img alt="" src={d(hash)} />;
  return (
    <div className="soc-d369__pin" style={{ inset }} data-node-id={nodeId}>
      {inner === 'x' ? (
        <div className="soc-d369__pin-inner soc-d369__pin-inner--x">{img}</div>
      ) : inner === 'y' ? (
        <div className="soc-d369__pin-inner soc-d369__pin-inner--y">{img}</div>
      ) : (
        img
      )}
    </div>
  );
}

/** Figma 211:2175 — Main logo grid */
export function SeoculusDiagram369() {
  return (
    <div className="soc-d369" data-node-id="211:2175">
      <D369Pin inset="23.19% 65.08% 0.1% 34.92%" nodeId="211:1991" hash="b2aba984cda7a736972d9e61a9b4eb24f56a0591" inner="x" />
      <D369Pin inset="43.26% 49.64% 43.67% 48.38%" nodeId="211:1890" hash="9a6a8a6e535a4ee21b41341edc7b2be047f5c671" />
      <D369Pin inset="73.4% 61.08% 13.53% 36.86%" nodeId="211:1891" hash="9a7a3e6701fb87ab72bef538bf91824fe715e668" />
      <D369Pin inset="73.35% 63.06% 13.58% 34.96%" nodeId="211:1892" hash="6e29711716d304d2004a0cab7012900ca5afac60" />
      <D369Pin inset="42.44% 37.56% 44.49% 60.38%" nodeId="211:1893" hash="ad4d01c9ee41b8f04dd6c610253eef6854a07e2d" />
      <D369Pin inset="42.4% 39.54% 44.53% 58.48%" nodeId="211:1894" hash="1e10eced40ad11bac851fef20d9dc13650dcfe7d" />
      <D369Pin inset="29.08% 41.59% 57.85% 56.43%" nodeId="211:1895" hash="1e10eced40ad11bac851fef20d9dc13650dcfe7d" />
      <D369Pin inset="86.71% 59.04% 0.23% 38.98%" nodeId="211:1896" hash="6e29711716d304d2004a0cab7012900ca5afac60" />
      <D369Pin inset="42.27% 41.55% 13.38% 38.89%" nodeId="211:1939" hash="d560fd4ea5e361e4eba03f18f0ee783ed885d0c1" />
      <D369Pin inset="50.68% 54.66% 45.73% 44.24%" nodeId="211:1980" hash="7ff7930657490c04b09f1d5172d626e51c16e1cf" />
      <D369Pin inset="75.81% 53.26% 20.6% 45.64%" nodeId="211:1983" hash="4b83c33ab04173243071a567b2131d7d78a42ded" />
      <D369Pin inset="65% 42.48% 31.41% 56.42%" nodeId="211:1986" hash="40fb27ad44bbbbc2fe0dd2c429f7f56266a4c455" />
      <D369Pin inset="28.95% 37.52% 71.05% 34.92%" nodeId="211:1989" hash="446f2e54a9280127a79c31b34e13d46bfa5c9cba" inner="y" />
      <D369Pin inset="42.27% 37.45% 57.73% 34.93%" nodeId="211:1990" hash="aee7bebaf91b50b26ec7c8ac9d010b36966f9914" inner="y" />
      <D369Pin inset="23.03% 61.05% 0 38.95%" nodeId="211:1992" hash="45ca2091e8f5cc43e5456605c1ee003bb09bfafd" inner="x" />
      <D369Pin inset="29.25% 41.55% 0.34% 58.45%" nodeId="211:1993" hash="1b4b211503f26cbd00ad2108ca9096e12bd774e0" inner="x" />
      <D369Pin inset="28.95% 37.53% 0.1% 62.47%" nodeId="211:1994" hash="f280c9f0eed6339f60b764099ead6931937af746" inner="x" />
      <D369Pin inset="86.59% 37.45% 13.41% 34.96%" nodeId="211:1995" hash="b46bdaf1d2f03ed3609a408cd1be17f3fef03fe0" inner="y" />
      <D369Pin inset="99.9% 37.49% 0.1% 34.89%" nodeId="211:1996" hash="4088d2ebe4b3c535e9fe96b7df21c4962bb60bec" inner="y" />
      <D369Pin inset="24.05% 63.8% 73.8% 35.56%" nodeId="211:1997" hash="2503a29f30b5731d62484bfee1f4bc693a9b394e" />
      <D369Pin inset="24.05% 61.61% 73.8% 37.75%" nodeId="211:1998" hash="d5909e834fe62420eab9a51273daf03b6abc8d79" />
      <D369Pin inset="23.03% 63.03% 71.28% 36.97%" nodeId="211:1999" hash="beb78b7fa6f5a393b6b789e840829d6e301ede8a" inner="x" />
      <D369Pin inset="26.73% 63.03% 73.27% 34.93%" nodeId="211:2000" hash="2c8c33268f22bc2fd1316cc76e175d47572178fb" inner="y" />
      <D369Pin inset="26.73% 61.05% 73.27% 36.97%" nodeId="211:2001" hash="1e187139b6af12d47eac6d863c3fa6c20e1f3f89" inner="y" />

      <div className="soc-d369__pin" style={{ inset: '21.76% 0 0.14% 64.08%' }} data-node-id="211:2172">
        <div className="soc-d369__right-wrap">
          <img alt="" src={d('e722cb8d41aec885d555c7c3ae003035aad54443')} />
        </div>
      </div>

      <div className="soc-d369__layer" data-node-id="211:2076">
        <D369Pin inset="48.39% 56.37% 17.58% 11.72%" nodeId="211:2078" hash="eecf65545145291a4b43174695e5071fa8830e1f" />
        <D369Pin inset="24.56% 11.98% 38.11% 42.57%" nodeId="211:2097" hash="df5d17a448a7bc59d1750ede94a43b87e884c315" />
        <D369Pin inset="47.7% 55.3% 47.77% 41.55%" nodeId="211:2130" hash="ef0f4c5795c408219cf821432b38e1bc7f645301" />
        <D369Pin inset="0 99.89% 0.16% 0.11%" nodeId="211:2133" hash="aabf9c5a5efb9e281df24504538c02397cd22246" inner="x" />
        <D369Pin inset="0 88.19% 0.16% 11.81%" nodeId="211:2134" hash="dccb5bfebf484c7f551315d47c6403ae52f416f7" inner="x" />
        <D369Pin inset="7.37% 0.2% 92.63% 0.11%" nodeId="211:2138" hash="c946a778d6060317f39eaf3458c34b73f351febe" inner="y" />
        <D369Pin inset="82.42% 0 17.58% 0.11%" nodeId="211:2139" hash="b83838f832c542d8ae065162387772f19121132d" inner="y" />
        <D369Pin inset="24.3% 0.2% 75.7% 0.11%" nodeId="211:2143" hash="4a8acc3f33f5bdf9ef910b71d36ca2693559f568" inner="y" />
        <D369Pin inset="99.84% 0 0.16% 0.11%" nodeId="211:2147" hash="b622f4b5c4064a0be6f4f40b89f9f545c83dfea2" inner="y" />
        <D369Pin inset="7.37% 0.2% 0.16% 99.8%" nodeId="211:2148" hash="9e795c746303fd740de0e189d653ed6aea7cf379" inner="x" />
        <D369Pin inset="7.37% 12.07% 0.16% 87.93%" nodeId="211:2149" hash="76a3ef85a8c9eb152145db22eff408edf8b75253" inner="x" />
        <D369Pin inset="49.69% 57.35% 33.12% 36.85%" nodeId="211:2153" hash="db7f92ae2963c652eb80471bba59aee054f0ebf4" />
        <D369Pin inset="7.37% 12.23% 75.44% 81.97%" nodeId="211:2155" hash="e67f22d8316aa254c50dc34332868cb8984a39d7" />
        <D369Pin inset="82.65% 82.48% 0.16% 11.72%" nodeId="211:2156" hash="ffeca902cc4b491be9ff1335cdd82dd38ad336d8" />
        <D369Pin inset="65% 88.28% 17.81% 5.78%" nodeId="211:2157" hash="15a1910c4e8a58030d048f5f110aa750a8e450d4" />
        <D369Pin inset="65% 94.09% 17.81% 0.11%" nodeId="211:2158" hash="e0fda72dbaf26c1e26d85492cb846d80a7bf8210" />
        <D369Pin inset="24.22% 6.19% 58.59% 88.01%" nodeId="211:2159" hash="2db84b638dca0844f6238bb9729abd3b2c7d497f" />
        <D369Pin inset="1.19% 96.14% 96.27% 2.15%" nodeId="211:2160" hash="f7a4cb086b3320a90042caece1bb19fbe7db8eb9" />
        <D369Pin inset="1.19% 90.3% 96.27% 8%" nodeId="211:2161" hash="9667b3fcd0374a6cb2d8b68bedf70f4250b03e01" />
        <D369Pin inset="24.22% 0.38% 58.59% 93.67%" nodeId="211:2162" hash="985eab35edd929f063807e61a0c49eca6790d425" />
        <D369Pin inset="0 94.09% 92.94% 5.91%" nodeId="211:2164" hash="3ff599fcd2855f81c9cd597bcb4c001fef19edec" inner="x" />
        <D369Pin inset="4.37% 94.09% 95.63% 0.14%" nodeId="211:2165" hash="d0ed0336e4b9b3d27bffa68614b4b57d0f437e76" inner="y" />
        <D369Pin inset="4.37% 88.29% 95.63% 5.91%" nodeId="211:2166" hash="ddc25f81dfba48eb91519c451c3181ae5167fb9f" inner="y" />
      </div>
    </div>
  );
}
