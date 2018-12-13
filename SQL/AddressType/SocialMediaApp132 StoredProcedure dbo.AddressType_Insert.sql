USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[AddressType_Insert]    Script Date: 9/11/2018 10:09:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Insert an address type>
-- =============================================
ALTER PROCEDURE [dbo].[AddressType_Insert] 
	-- Add the parameters for the stored procedure here
	@TypeName nvarchar(50),
	@TypeDescription nvarchar(200),
	@Id int output
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int,
		@Id int

EXEC	@return_value = [dbo].[AddressType_Insert]
		@TypeName = N'Billing',
		@TypeDescription = N'Billing address',
		@Id = @Id OUTPUT

SELECT	@Id as N'@Id'

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Insert into dbo.AddressType ([TypeName], [TypeDescription])
	values (@TypeName, @TypeDescription)
	set @Id = SCOPE_IDENTITY()

END
