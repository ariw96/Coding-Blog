import "./header.css";
export default function Header() {
	return (
		<div className="header">
			<div className="headerTitles">
				<h1 className="headerTitleSm">Sharing Tricks & Tips</h1>
			</div>
			<img
				className="headerImg"
				src="https://res.cloudinary.com/practicaldev/image/fetch/s--HppI3joY--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ri1ahc6zfstekngl1ejg.png"
				alt=""
			/>
		</div>
	);
}
